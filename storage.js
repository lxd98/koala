const fs = require("fs/promises");
const path = require("path");
const { app, shell } = require("electron");

const APP_FOLDER = "Research Project Compass";
const SYNC_FOLDER_NAME = "research-project-compass-sync";
const LOCAL_STATE_FILE = "state.json";
const CONFIG_FILE = "config.json";

function getPaths() {
  const rootDir = path.join(app.getPath("userData"), APP_FOLDER);
  const localPdfDir = path.join(rootDir, "pdfs");
  return {
    rootDir,
    localStatePath: path.join(rootDir, LOCAL_STATE_FILE),
    configPath: path.join(rootDir, CONFIG_FILE),
    localPdfDir
  };
}

function getSyncPaths(syncDirectory) {
  const rootDir = path.join(syncDirectory, SYNC_FOLDER_NAME);
  return {
    rootDir,
    syncStatePath: path.join(rootDir, LOCAL_STATE_FILE),
    syncPdfDir: path.join(rootDir, "pdfs")
  };
}

async function ensureDirectory(directoryPath) {
  await fs.mkdir(directoryPath, { recursive: true });
}

async function pathExists(targetPath) {
  try {
    await fs.access(targetPath);
    return true;
  } catch {
    return false;
  }
}

async function readJson(filePath, fallbackValue) {
  try {
    const content = await fs.readFile(filePath, "utf8");
    return JSON.parse(content);
  } catch {
    return fallbackValue;
  }
}

async function writeJson(filePath, value) {
  await ensureDirectory(path.dirname(filePath));
  await fs.writeFile(filePath, JSON.stringify(value, null, 2), "utf8");
}

function normalizeState(state, defaultLanguage) {
  return {
    ...state,
    language: state.language || defaultLanguage,
    updatedAt: state.updatedAt || new Date().toISOString(),
    ideas: state.ideas || [],
    projects: (state.projects || []).map((project) => ({
      ...project,
      tasks: project.tasks || [],
      papers: (project.papers || []).map((paper) => ({
        ...paper,
        fileName: paper.fileName || "",
        pdfId: paper.pdfId || ""
      }))
    }))
  };
}

function compareByUpdatedAt(leftState, rightState) {
  return new Date(leftState.updatedAt || 0).getTime() - new Date(rightState.updatedAt || 0).getTime();
}

async function loadConfig() {
  const { configPath } = getPaths();
  return readJson(configPath, {
    syncDirectory: "",
    lastSyncedAt: ""
  });
}

async function saveConfig(config) {
  const { configPath } = getPaths();
  await writeJson(configPath, config);
  return config;
}

async function ensureLocalStructure() {
  const { rootDir, localPdfDir } = getPaths();
  await ensureDirectory(rootDir);
  await ensureDirectory(localPdfDir);
}

async function copyFileIfMissing(sourcePath, targetPath) {
  if (!(await pathExists(sourcePath)) || (await pathExists(targetPath))) {
    return;
  }

  await ensureDirectory(path.dirname(targetPath));
  await fs.copyFile(sourcePath, targetPath);
}

async function syncPdfSet(state, sourceDir, targetDir) {
  await ensureDirectory(targetDir);

  for (const project of state.projects || []) {
    for (const paper of project.papers || []) {
      if (!paper.fileName) {
        continue;
      }

      await copyFileIfMissing(path.join(sourceDir, paper.fileName), path.join(targetDir, paper.fileName));
    }
  }
}

async function loadAppData({ fallbackState, defaultLanguage }) {
  await ensureLocalStructure();

  const paths = getPaths();
  const config = await loadConfig();
  const localState = normalizeState(
    await readJson(paths.localStatePath, fallbackState),
    defaultLanguage
  );

  let selectedState = localState;

  if (config.syncDirectory) {
    const syncPaths = getSyncPaths(config.syncDirectory);
    await ensureDirectory(syncPaths.rootDir);
    await ensureDirectory(syncPaths.syncPdfDir);

    const syncState = await readJson(syncPaths.syncStatePath, null);
    if (syncState) {
      const normalizedSyncState = normalizeState(syncState, defaultLanguage);
      if (compareByUpdatedAt(localState, normalizedSyncState) < 0) {
        selectedState = normalizedSyncState;
        await writeJson(paths.localStatePath, selectedState);
      }
    }

    await syncPdfSet(selectedState, syncPaths.syncPdfDir, paths.localPdfDir);
    await syncPdfSet(selectedState, paths.localPdfDir, syncPaths.syncPdfDir);
  } else if (!(await pathExists(paths.localStatePath))) {
    await writeJson(paths.localStatePath, selectedState);
  }

  return {
    state: selectedState,
    syncDirectory: config.syncDirectory,
    lastSyncedAt: config.lastSyncedAt
  };
}

async function saveAppData({ state, sync }) {
  await ensureLocalStructure();

  const paths = getPaths();
  const config = await loadConfig();
  const normalized = normalizeState(state, state.language || "en");

  await writeJson(paths.localStatePath, normalized);

  if (sync && config.syncDirectory) {
    const syncPaths = getSyncPaths(config.syncDirectory);
    await ensureDirectory(syncPaths.rootDir);
    await ensureDirectory(syncPaths.syncPdfDir);
    await writeJson(syncPaths.syncStatePath, normalized);
    await syncPdfSet(normalized, paths.localPdfDir, syncPaths.syncPdfDir);
    config.lastSyncedAt = new Date().toISOString();
    await saveConfig(config);
  }

  return {
    syncDirectory: config.syncDirectory,
    lastSyncedAt: config.lastSyncedAt
  };
}

async function setSyncDirectory(syncDirectory) {
  const config = await saveConfig({
    ...(await loadConfig()),
    syncDirectory
  });

  const syncPaths = getSyncPaths(syncDirectory);
  await ensureDirectory(syncPaths.rootDir);
  await ensureDirectory(syncPaths.syncPdfDir);

  return {
    syncDirectory: config.syncDirectory,
    lastSyncedAt: config.lastSyncedAt
  };
}

async function getSyncConfig() {
  const config = await loadConfig();
  return {
    syncDirectory: config.syncDirectory,
    lastSyncedAt: config.lastSyncedAt
  };
}

async function syncNow({ state }) {
  await ensureLocalStructure();

  const config = await loadConfig();
  if (!config.syncDirectory) {
    return {
      state,
      syncDirectory: "",
      lastSyncedAt: config.lastSyncedAt
    };
  }

  const paths = getPaths();
  const syncPaths = getSyncPaths(config.syncDirectory);
  await ensureDirectory(syncPaths.rootDir);
  await ensureDirectory(syncPaths.syncPdfDir);

  const incomingState = normalizeState(state, state.language || "en");
  const remoteState = await readJson(syncPaths.syncStatePath, null);
  let selectedState = incomingState;

  if (remoteState) {
    const normalizedRemote = normalizeState(remoteState, incomingState.language || "en");
    if (compareByUpdatedAt(incomingState, normalizedRemote) < 0) {
      selectedState = normalizedRemote;
    }
  }

  await writeJson(paths.localStatePath, selectedState);
  await writeJson(syncPaths.syncStatePath, selectedState);
  await syncPdfSet(selectedState, syncPaths.syncPdfDir, paths.localPdfDir);
  await syncPdfSet(selectedState, paths.localPdfDir, syncPaths.syncPdfDir);

  config.lastSyncedAt = new Date().toISOString();
  await saveConfig(config);

  return {
    state: selectedState,
    syncDirectory: config.syncDirectory,
    lastSyncedAt: config.lastSyncedAt
  };
}

function sanitizeFileName(fileName) {
  return fileName.replace(/[^a-zA-Z0-9._-]/g, "_");
}

async function savePdf({ paperId, fileName, bytes }) {
  await ensureLocalStructure();

  const config = await loadConfig();
  const { localPdfDir } = getPaths();
  const savedFileName = `${paperId}-${sanitizeFileName(fileName)}`;
  const localPath = path.join(localPdfDir, savedFileName);
  await fs.writeFile(localPath, Buffer.from(bytes));

  if (config.syncDirectory) {
    const syncPaths = getSyncPaths(config.syncDirectory);
    await ensureDirectory(syncPaths.syncPdfDir);
    await fs.copyFile(localPath, path.join(syncPaths.syncPdfDir, savedFileName));
  }

  return { fileName: savedFileName };
}

async function openPdf({ fileName }) {
  const config = await loadConfig();
  const { localPdfDir } = getPaths();
  const localPath = path.join(localPdfDir, fileName);

  if (!(await pathExists(localPath)) && config.syncDirectory) {
    const syncPaths = getSyncPaths(config.syncDirectory);
    const syncPath = path.join(syncPaths.syncPdfDir, fileName);
    if (await pathExists(syncPath)) {
      await ensureDirectory(localPdfDir);
      await fs.copyFile(syncPath, localPath);
    }
  }

  return shell.openPath(localPath);
}

module.exports = {
  loadAppData,
  saveAppData,
  setSyncDirectory,
  getSyncConfig,
  syncNow,
  savePdf,
  openPdf
};
