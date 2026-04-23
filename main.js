const path = require("path");
const { app, BrowserWindow, ipcMain, dialog } = require("electron");
const storage = require("./storage");

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 1480,
    height: 980,
    minWidth: 1100,
    minHeight: 760,
    backgroundColor: "#f4efe8",
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: true,
      nodeIntegration: false
    }
  });

  mainWindow.loadFile(path.join(__dirname, "..", "index.html"));
}

app.whenReady().then(() => {
  ipcMain.handle("desktop:load-app-data", async (_event, payload) => {
    return storage.loadAppData(payload);
  });

  ipcMain.handle("desktop:save-app-data", async (_event, payload) => {
    return storage.saveAppData(payload);
  });

  ipcMain.handle("desktop:choose-sync-directory", async () => {
    const result = await dialog.showOpenDialog({
      properties: ["openDirectory", "createDirectory"]
    });

    if (result.canceled || !result.filePaths[0]) {
      return storage.getSyncConfig();
    }

    return storage.setSyncDirectory(result.filePaths[0]);
  });

  ipcMain.handle("desktop:sync-now", async (_event, payload) => {
    return storage.syncNow(payload);
  });

  ipcMain.handle("desktop:save-pdf", async (_event, payload) => {
    return storage.savePdf(payload);
  });

  ipcMain.handle("desktop:open-pdf", async (_event, payload) => {
    return storage.openPdf(payload);
  });

  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
