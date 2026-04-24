const STORAGE_KEY = "research-project-compass";
const DEFAULT_LANGUAGE = "en";
const supportedLanguages = ["en", "zh"];
const PDF_DB_NAME = "research-project-compass-db";
const PDF_STORE_NAME = "pdfs";
const AUTO_SYNC_INTERVAL_MS = 30 * 60 * 1000;

const translations = {
  en: {
    appTitle: "Research Project Compass",
    brandEyebrow: "PhD workflow demo",
    brandTitle: "Research Project Compass",
    brandCopy: "Keep big-picture projects, current progress, and fragile new ideas in one place.",
    languageLabel: "Language",
    syncTitle: "Sync",
    syncNowButton: "Sync now",
    chooseSyncFolderButton: "Choose sync folder",
    syncBrowserHint: "Desktop sync is available in the packaged app.",
    syncDesktopNoFolder: "No sync folder selected yet. Choose one in Dropbox, OneDrive, iCloud Drive, or Syncthing.",
    syncDesktopReady: "Sync folder: {path}",
    syncSuccess: "Synced at {time}.",
    syncFailed: "Sync failed. Your local data is still safe on this device.",
    autoSyncSuccess: "Auto-synced at {time}.",
    quickCaptureTitle: "Quick Capture",
    quickCaptureCopy: "Save a loose idea before it disappears.",
    ideaTitleLabel: "Idea title",
    ideaTitlePlaceholder: "Possible paper angle",
    ideaDescriptionLabel: "Why it matters",
    ideaDescriptionPlaceholder: "A short thought, hypothesis, or experimental direction",
    ideaProjectLabel: "Link to project",
    saveIdeaButton: "Save idea",
    todayFocusTitle: "Today's Focus",
    focusSummaryEmpty: "Choose a project to see its next best step.",
    focusCardEmpty: "Pick a project from the dashboard.",
    overviewEyebrow: "Overview",
    overviewTitle: "Your research portfolio at a glance",
    overviewCopy: "A demo workspace for tracking stage, deadlines, notes, and experimental momentum.",
    addProjectButton: "Add project",
    projectsTitle: "Projects",
    projectsCopy: "From early concepts to finished work.",
    filterLabel: "Filter",
    projectDetailTitle: "Project detail",
    projectDetailCopy: "Select a project to inspect tasks, notes, and deadlines.",
    projectDetailEmpty: "No project selected yet.",
    ideaBankTitle: "Idea Bank",
    ideaBankCopy: "Small sparks that deserve a home.",
    modalTitle: "Add a project",
    modalCopy: "Create a project with a clear next action and a deadline.",
    projectTitleLabel: "Project title",
    projectTitlePlaceholder: "Dissertation Chapter 2",
    projectStatusLabel: "Status",
    deadlineLabel: "Deadline",
    summaryLabel: "Summary",
    summaryPlaceholder: "What is this project trying to achieve?",
    nextActionLabel: "Next action",
    nextActionPlaceholder: "Revise related-work section",
    progressLabel: "Progress %",
    cancelButton: "Cancel",
    createProjectButton: "Create project",
    projectCreatedToast: "Project added successfully.",
    noDeadline: "No deadline",
    noSummary: "No summary yet.",
    openProjectButton: "Open",
    papersTitle: "Related papers",
    papersCopy: "Store key papers for this project using a link or a local PDF.",
    paperTitleLabel: "Paper title",
    paperTitlePlaceholder: "Attention Is All You Need",
    paperJournalLabel: "Journal or venue",
    paperJournalPlaceholder: "NeurIPS / Nature / Journal name",
    paperYearLabel: "Published year",
    paperYearPlaceholder: "2024",
    paperLinkLabel: "Paper link",
    paperLinkPlaceholder: "https://doi.org/... or publisher page",
    paperPdfLabel: "Upload PDF",
    paperSourceHint: "You can add a link, a PDF, or both.",
    addPaperButton: "Add paper",
    noPapers: "No papers saved for this project yet.",
    openLinkButton: "Open link",
    openPdfButton: "Open PDF",
    paperFileBadge: "PDF saved",
    paperRequiredSource: "Please provide a paper link or upload a PDF.",
    statsTotalProjects: "Total projects",
    statsActiveProjects: "Active or writing",
    statsUpcomingDeadlines: "Deadlines in 14 days",
    statsStoredIdeas: "Stored ideas",
    statusAll: "All statuses",
    statusPlanning: "Planning",
    statusActive: "Active",
    statusWaiting: "Waiting",
    statusWriting: "Writing",
    statusSubmitted: "Submitted",
    statusFinished: "Finished",
    detailStatus: "Status",
    updateStatusLabel: "Update status",
    deleteProjectButton: "Delete project",
    deleteProjectConfirm: "Delete this project? Its linked ideas will become unlinked.",
    noProjectsForFilter: "No projects match this filter yet.",
    dueLabel: "Due",
    completeLabel: "complete",
    detailDeadline: "Deadline",
    detailProgress: "Progress",
    detailNextAction: "Next action",
    detailNotes: "Notes",
    detailTasks: "Task checklist",
    noNextAction: "No next action recorded yet.",
    noNotes: "No notes yet.",
    noIdeas: "No ideas captured yet.",
    noIdeaDescription: "No extra detail recorded.",
    unlinkedIdea: "Unlinked idea",
    deleteIdeaButton: "Remove",
    deleteIdeaConfirm: "Remove this idea?",
    focusProjectSummary: "{title} is your current focus project.",
    focusNextBestStep: "Next best step",
    focusEverythingDone: "Everything visible is done. This is a good time to decide the next milestone.",
    defaultTaskText: "Define the first concrete task"
  },
  zh: {
    appTitle: "研究项目罗盘",
    brandEyebrow: "博士工作流演示",
    brandTitle: "研究项目罗盘",
    brandCopy: "把项目全局、当前进度和零散新想法放在同一个地方。",
    languageLabel: "语言",
    syncTitle: "同步",
    syncNowButton: "立即同步",
    chooseSyncFolderButton: "选择同步文件夹",
    syncBrowserHint: "打包成桌面应用后即可使用跨设备同步。",
    syncDesktopNoFolder: "还没有选择同步文件夹。你可以选择 Dropbox、OneDrive、iCloud Drive 或 Syncthing 中的文件夹。",
    syncDesktopReady: "同步文件夹：{path}",
    syncSuccess: "已在 {time} 完成同步。",
    syncFailed: "同步失败，但当前设备上的本地数据仍然安全。",
    autoSyncSuccess: "已在 {time} 自动同步。",
    quickCaptureTitle: "快速记录",
    quickCaptureCopy: "在灵感消失前先把它记下来。",
    ideaTitleLabel: "想法标题",
    ideaTitlePlaceholder: "可能的论文切入点",
    ideaDescriptionLabel: "为什么重要",
    ideaDescriptionPlaceholder: "简短记录一个想法、假设或实验方向",
    ideaProjectLabel: "关联项目",
    saveIdeaButton: "保存想法",
    todayFocusTitle: "今日重点",
    focusSummaryEmpty: "选择一个项目即可查看下一步最值得做的事。",
    focusCardEmpty: "请先从项目面板中选择一个项目。",
    overviewEyebrow: "总览",
    overviewTitle: "一眼掌握你的研究项目组合",
    overviewCopy: "这是一个用于追踪阶段、截止日期、笔记和实验推进情况的演示工作台。",
    addProjectButton: "新增项目",
    projectsTitle: "项目",
    projectsCopy: "从早期构想到最终完成，都能集中管理。",
    filterLabel: "筛选",
    projectDetailTitle: "项目详情",
    projectDetailCopy: "选择一个项目来查看任务、笔记和截止日期。",
    projectDetailEmpty: "还没有选中任何项目。",
    ideaBankTitle: "想法库",
    ideaBankCopy: "给那些细小但重要的灵感一个归宿。",
    modalTitle: "新增项目",
    modalCopy: "创建一个项目，并记录清晰的下一步和截止日期。",
    projectTitleLabel: "项目标题",
    projectTitlePlaceholder: "论文第二章",
    projectStatusLabel: "状态",
    deadlineLabel: "截止日期",
    summaryLabel: "摘要",
    summaryPlaceholder: "这个项目希望达成什么目标？",
    nextActionLabel: "下一步行动",
    nextActionPlaceholder: "修改相关工作部分",
    progressLabel: "进度 %",
    cancelButton: "取消",
    createProjectButton: "创建项目",
    projectCreatedToast: "项目已成功添加。",
    noDeadline: "无截止日期",
    noSummary: "暂无摘要。",
    openProjectButton: "查看",
    papersTitle: "相关论文",
    papersCopy: "你可以为每个项目保存关键论文，来源可以是链接或本地 PDF。",
    paperTitleLabel: "论文标题",
    paperTitlePlaceholder: "Attention Is All You Need",
    paperJournalLabel: "期刊或会议",
    paperJournalPlaceholder: "NeurIPS / Nature / 期刊名称",
    paperYearLabel: "发表年份",
    paperYearPlaceholder: "2024",
    paperLinkLabel: "论文链接",
    paperLinkPlaceholder: "https://doi.org/... 或出版社页面",
    paperPdfLabel: "上传 PDF",
    paperSourceHint: "你可以添加链接、PDF，或同时添加两者。",
    addPaperButton: "添加论文",
    noPapers: "这个项目还没有保存任何论文。",
    openLinkButton: "打开链接",
    openPdfButton: "打开 PDF",
    paperFileBadge: "PDF 已保存",
    paperRequiredSource: "请提供论文链接或上传一个 PDF。",
    statsTotalProjects: "项目总数",
    statsActiveProjects: "进行中或写作中",
    statsUpcomingDeadlines: "14天内截止",
    statsStoredIdeas: "已保存想法",
    statusAll: "全部状态",
    statusPlanning: "规划中",
    statusActive: "进行中",
    statusWaiting: "等待中",
    statusWriting: "写作中",
    statusSubmitted: "已提交",
    statusFinished: "已完成",
    detailStatus: "状态",
    updateStatusLabel: "更新状态",
    deleteProjectButton: "删除项目",
    deleteProjectConfirm: "要删除这个项目吗？它关联的想法会变成未关联状态。",
    noProjectsForFilter: "当前筛选条件下还没有项目。",
    dueLabel: "截止",
    completeLabel: "已完成",
    detailDeadline: "截止日期",
    detailProgress: "进度",
    detailNextAction: "下一步行动",
    detailNotes: "笔记",
    detailTasks: "任务清单",
    noNextAction: "还没有记录下一步行动。",
    noNotes: "还没有笔记。",
    noIdeas: "还没有保存任何想法。",
    noIdeaDescription: "没有额外描述。",
    unlinkedIdea: "未关联项目",
    deleteIdeaButton: "删除",
    deleteIdeaConfirm: "要删除这个想法吗？",
    focusProjectSummary: "{title} 是你当前重点推进的项目。",
    focusNextBestStep: "最值得做的下一步",
    focusEverythingDone: "目前可见任务都完成了，现在适合决定下一个里程碑。",
    defaultTaskText: "定义第一个具体任务"
  }
};

const sampleData = {
  selectedProjectId: "proj-1",
  updatedAt: "2026-04-23T03:30:00.000Z",
  projects: [
    {
      id: "proj-1",
      title: "Thesis Chapter Draft",
      status: "active",
      deadline: "2026-05-20",
      progress: 35,
      summary: "A clean starter example for organizing one research project, its next action, and related papers.",
      nextAction: "Outline the next section you want to write.",
      notes: "Replace this demo project with your own work whenever you are ready.",
      tasks: [
        { id: "task-1", text: "Draft a short outline", done: true },
        { id: "task-2", text: "Write the next concrete step", done: false }
      ],
      papers: [
        {
          id: "paper-1",
          title: "Example Research Workflow Paper",
          journal: "Journal of Research Practice",
          year: "2024",
          link: "https://example.com/research-workflow-paper",
          fileName: ""
        }
      ]
    }
  ],
  ideas: [
    {
      id: "idea-1",
      title: "Possible follow-up experiment",
      description: "A lightweight starter idea to show how quick capture works.",
      projectId: "proj-1",
      createdAt: "2026-04-22T08:30:00.000Z"
    }
  ]
};

const elements = {
  pageTitle: document.querySelector("title"),
  statsGrid: document.querySelector("#stats-grid"),
  projectList: document.querySelector("#project-list"),
  projectDetail: document.querySelector("#project-detail"),
  ideaList: document.querySelector("#idea-list"),
  focusSummary: document.querySelector("#focus-summary"),
  focusCard: document.querySelector("#focus-card"),
  ideaForm: document.querySelector("#idea-form"),
  ideaProject: document.querySelector("#idea-project"),
  statusFilter: document.querySelector("#status-filter"),
  projectModal: document.querySelector("#project-modal"),
  projectForm: document.querySelector("#project-form"),
  openProjectModal: document.querySelector("#open-project-modal"),
  closeProjectModal: document.querySelector("#close-project-modal"),
  projectTemplate: document.querySelector("#project-card-template"),
  languageSelect: document.querySelector("#language-select"),
  syncStatus: document.querySelector("#sync-status"),
  syncNowButton: document.querySelector("#sync-now-button"),
  chooseSyncFolderButton: document.querySelector("#choose-sync-folder-button"),
  appToast: document.querySelector("#app-toast")
};

const runtime = {
  isDesktop: Boolean(window.desktopAPI),
  syncDirectory: "",
  lastSyncedAt: "",
  syncStatusKey: "syncBrowserHint",
  toastTimer: null,
  autoSyncTimer: null
};

let state = normalizeState({
  ...structuredClone(sampleData),
  language: DEFAULT_LANGUAGE
});

bootstrap();

async function bootstrap() {
  const loaded = await loadState();
  state = loaded.state;
  Object.assign(runtime, loaded.runtime);
  render();
  attachEvents();
  startAutoSync();
}

async function loadState() {
  if (runtime.isDesktop) {
    try {
      const result = await window.desktopAPI.loadAppData({
        fallbackState: sampleData,
        defaultLanguage: DEFAULT_LANGUAGE
      });

      return {
        state: normalizeState(result.state),
        runtime: {
          isDesktop: true,
          syncDirectory: result.syncDirectory || "",
          lastSyncedAt: result.lastSyncedAt || "",
          syncStatusKey: result.syncDirectory ? "syncDesktopReady" : "syncDesktopNoFolder"
        }
      };
    } catch (error) {
      console.warn("Desktop storage failed, falling back to browser storage.", error);
    }
  }

  const saved = localStorage.getItem(STORAGE_KEY);
  if (!saved) {
    const initialState = normalizeState({
      ...structuredClone(sampleData),
      language: DEFAULT_LANGUAGE
    });
    localStorage.setItem(STORAGE_KEY, JSON.stringify(initialState));
    return {
      state: initialState,
      runtime: { ...runtime }
    };
  }

  try {
    const parsed = JSON.parse(saved);
    return {
      state: normalizeState({
        ...parsed,
        language: supportedLanguages.includes(parsed.language) ? parsed.language : DEFAULT_LANGUAGE
      }),
      runtime: { ...runtime }
    };
  } catch (error) {
    console.warn("Could not parse saved state. Falling back to sample data.", error);
    return {
      state: normalizeState({
        ...structuredClone(sampleData),
        language: DEFAULT_LANGUAGE
      }),
      runtime: { ...runtime }
    };
  }
}

async function saveState(options = {}) {
  state.updatedAt = new Date().toISOString();

  if (runtime.isDesktop) {
    const result = await window.desktopAPI.saveAppData({
      state,
      sync: options.sync !== false
    });

    runtime.syncDirectory = result.syncDirectory || "";
    runtime.lastSyncedAt = result.lastSyncedAt || runtime.lastSyncedAt;
    runtime.syncStatusKey = runtime.syncDirectory ? "syncDesktopReady" : "syncDesktopNoFolder";
    return;
  }

  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function attachEvents() {
  elements.ideaForm.addEventListener("submit", handleIdeaSubmit);
  elements.statusFilter.addEventListener("change", renderProjects);
  elements.openProjectModal.addEventListener("click", () => {
    resetProjectForm();
    elements.projectModal.showModal();
  });
  elements.closeProjectModal.addEventListener("click", () => {
    resetProjectForm();
    elements.projectModal.close();
  });
  elements.projectForm.addEventListener("submit", handleProjectSubmit);
  elements.languageSelect.addEventListener("change", handleLanguageChange);
  elements.syncNowButton.addEventListener("click", handleSyncNow);
  elements.chooseSyncFolderButton.addEventListener("click", handleChooseSyncFolder);
}

function render() {
  renderStaticText();
  renderStats();
  renderProjects();
  renderProjectDetail();
  renderIdeas();
  renderFocusCard();
  populateProjectSelect();
}

function renderStaticText() {
  document.documentElement.lang = state.language;
  elements.pageTitle.textContent = t("appTitle");
  elements.languageSelect.value = state.language;

  document.querySelectorAll("[data-i18n]").forEach((element) => {
    replaceLeadingText(element, t(element.dataset.i18n));
  });

  document.querySelectorAll("[data-i18n-placeholder]").forEach((element) => {
    element.placeholder = t(element.dataset.i18nPlaceholder);
  });

  elements.syncStatus.textContent = getSyncStatusCopy();
}

function renderStats() {
  const totalProjects = state.projects.length;
  const activeProjects = state.projects.filter((project) => project.status === "active" || project.status === "writing").length;
  const upcomingDeadlines = state.projects.filter((project) => {
    const remainingDays = daysUntil(project.deadline);
    return Number.isFinite(remainingDays) && remainingDays <= 14;
  }).length;
  const totalIdeas = state.ideas.length;

  const stats = [
    { label: t("statsTotalProjects"), value: totalProjects },
    { label: t("statsActiveProjects"), value: activeProjects },
    { label: t("statsUpcomingDeadlines"), value: upcomingDeadlines },
    { label: t("statsStoredIdeas"), value: totalIdeas }
  ];

  elements.statsGrid.innerHTML = stats
    .map(
      (stat) => `
        <article class="stat-card">
          <p class="stat-label">${stat.label}</p>
          <p class="stat-value">${stat.value}</p>
        </article>
      `
    )
    .join("");
}

function renderProjects() {
  const selectedFilter = elements.statusFilter.value;
  const filteredProjects =
    selectedFilter === "all"
      ? state.projects
      : state.projects.filter((project) => project.status === selectedFilter);

  if (!filteredProjects.length) {
    elements.projectList.innerHTML = `<div class="empty-state-card">${t("noProjectsForFilter")}</div>`;
    return;
  }

  elements.projectList.innerHTML = "";

  filteredProjects.forEach((project) => {
    const fragment = elements.projectTemplate.content.cloneNode(true);
    const card = fragment.querySelector(".project-card");
    const statusPill = fragment.querySelector(".status-pill");

    statusPill.textContent = getStatusLabel(project.status);
    statusPill.classList.add(`status-${project.status}`);

    fragment.querySelector(".project-title").textContent = project.title;
    fragment.querySelector(".project-summary").textContent = project.summary || t("noSummary");
    fragment.querySelector(".deadline-copy").textContent = project.deadline
      ? `${t("dueLabel")} ${formatDate(project.deadline)}`
      : t("noDeadline");
    fragment.querySelector(".progress-copy").textContent = `${project.progress}% ${t("completeLabel")}`;
    fragment.querySelector(".progress-bar").style.width = `${project.progress}%`;
    fragment.querySelector(".project-open-button").textContent = t("openProjectButton");

    if (project.id === state.selectedProjectId) {
      card.classList.add("active");
    }

    fragment.querySelector(".compact-button").addEventListener("click", () => {
      state.selectedProjectId = project.id;
      saveState();
      renderProjects();
      renderProjectDetail();
      renderFocusCard();
    });

    elements.projectList.appendChild(fragment);
  });
}

function renderProjectDetail() {
  const project = getSelectedProject();

  if (!project) {
    elements.projectDetail.innerHTML = t("projectDetailEmpty");
    return;
  }

  elements.projectDetail.innerHTML = `
    <article class="project-detail-card">
      <div class="detail-top">
        <div>
          <span class="status-pill status-${project.status}">${getStatusLabel(project.status)}</span>
          <h3>${project.title}</h3>
        </div>
        <div class="detail-meta">
          <span>${t("detailDeadline")}: ${project.deadline ? formatDate(project.deadline) : t("noDeadline")}</span><br>
          <span>${t("detailProgress")}: ${project.progress}%</span>
        </div>
      </div>
      <p class="detail-summary">${project.summary || t("noSummary")}</p>
      <div class="progress-track">
        <div class="progress-bar" style="width: ${project.progress}%"></div>
      </div>
      <section class="detail-section">
        <h4>${t("detailNextAction")}</h4>
        <div class="focus-card">${project.nextAction || t("noNextAction")}</div>
      </section>
      <section class="detail-section">
        <h4>${t("detailNotes")}</h4>
        <p class="detail-notes">${project.notes || t("noNotes")}</p>
      </section>
      <section class="detail-section">
        <h4>${t("detailStatus")}</h4>
        <div class="detail-actions">
          <label>
            ${t("updateStatusLabel")}
            <select class="inline-select" id="project-status-select">
              ${renderStatusOptions(project.status)}
            </select>
          </label>
          <button type="button" class="ghost-button danger-button" id="delete-project-button">${t("deleteProjectButton")}</button>
        </div>
      </section>
      <section class="detail-section">
        <h4>${t("detailTasks")}</h4>
        <div class="task-list">
          ${project.tasks
            .map(
              (task) => `
                <label class="task-item">
                  <input class="task-checkbox" type="checkbox" data-task-id="${task.id}" ${task.done ? "checked" : ""}>
                  <span>${task.text}</span>
                </label>
              `
            )
            .join("")}
        </div>
      </section>
      <section class="detail-section">
        <div class="detail-section-header">
          <div>
            <h4>${t("papersTitle")}</h4>
            <p class="section-copy">${t("papersCopy")}</p>
          </div>
        </div>
        <form class="paper-form" id="paper-form">
          <label>
            ${t("paperTitleLabel")}
            <input type="text" name="title" placeholder="${t("paperTitlePlaceholder")}" required>
          </label>
          <div class="paper-form-grid">
            <label>
              ${t("paperJournalLabel")}
              <input type="text" name="journal" placeholder="${t("paperJournalPlaceholder")}" required>
            </label>
            <label>
              ${t("paperYearLabel")}
              <input type="number" name="year" min="1900" max="2100" placeholder="${t("paperYearPlaceholder")}" required>
            </label>
          </div>
          <label>
            ${t("paperLinkLabel")}
            <input type="url" name="link" placeholder="${t("paperLinkPlaceholder")}">
          </label>
          <label>
            ${t("paperPdfLabel")}
            <input type="file" name="pdf" accept="application/pdf">
          </label>
          <p class="form-hint">${t("paperSourceHint")}</p>
          <button type="submit" class="primary-button">${t("addPaperButton")}</button>
        </form>
        <div class="paper-list">
          ${renderPaperList(project)}
        </div>
      </section>
    </article>
  `;

  elements.projectDetail.querySelectorAll(".task-checkbox").forEach((checkbox) => {
    checkbox.addEventListener("change", async (event) => {
      await toggleTask(project.id, event.target.dataset.taskId, event.target.checked);
    });
  });

  elements.projectDetail.querySelector("#project-status-select").addEventListener("change", async (event) => {
    await updateProjectStatus(project.id, event.target.value);
  });

  elements.projectDetail.querySelector("#delete-project-button").addEventListener("click", async () => {
    await deleteProject(project.id);
  });

  elements.projectDetail.querySelector("#paper-form").addEventListener("submit", async (event) => {
    await handlePaperSubmit(event, project.id);
  });

  elements.projectDetail.querySelectorAll("[data-open-pdf]").forEach((button) => {
    button.addEventListener("click", async () => {
      await openPaperPdf(button.dataset.openPdf);
    });
  });
}

function renderIdeas() {
  if (!state.ideas.length) {
    elements.ideaList.innerHTML = `<div class="empty-state-card">${t("noIdeas")}</div>`;
    return;
  }

  const ideaMarkup = [...state.ideas]
    .sort((first, second) => new Date(second.createdAt) - new Date(first.createdAt))
    .map((idea) => {
      const linkedProject = state.projects.find((project) => project.id === idea.projectId);

      return `
        <article class="idea-card">
          <div class="idea-card-top">
            <small>${formatDateTime(idea.createdAt)}</small>
            <button type="button" class="ghost-button compact-button" data-delete-idea="${idea.id}">${t("deleteIdeaButton")}</button>
          </div>
          <h3>${idea.title}</h3>
          <p>${idea.description || t("noIdeaDescription")}</p>
          <small>${linkedProject ? linkedProject.title : t("unlinkedIdea")}</small>
        </article>
      `;
    })
    .join("");

  elements.ideaList.innerHTML = ideaMarkup;

  elements.ideaList.querySelectorAll("[data-delete-idea]").forEach((button) => {
    button.addEventListener("click", async () => {
      await deleteIdea(button.dataset.deleteIdea);
    });
  });
}

function renderFocusCard() {
  const project = getSelectedProject();

  if (!project) {
    elements.focusSummary.textContent = t("focusSummaryEmpty");
    elements.focusCard.textContent = t("focusCardEmpty");
    return;
  }

  const incompleteTasks = project.tasks.filter((task) => !task.done);
  const focusText = incompleteTasks[0]?.text || project.nextAction || t("focusEverythingDone");

  elements.focusSummary.textContent = t("focusProjectSummary", { title: project.title });
  elements.focusCard.innerHTML = `
    <strong>${t("focusNextBestStep")}</strong>
    <p>${focusText}</p>
  `;
}

function populateProjectSelect() {
  const options = [`<option value="">${t("unlinkedIdea")}</option>`]
    .concat(state.projects.map((project) => `<option value="${project.id}">${project.title}</option>`))
    .join("");

  elements.ideaProject.innerHTML = options;
}

async function handleIdeaSubmit(event) {
  event.preventDefault();

  const formData = new FormData(event.currentTarget);
  state.ideas.push({
    id: crypto.randomUUID(),
    title: formData.get("title"),
    description: formData.get("description"),
    projectId: formData.get("projectId"),
    createdAt: new Date().toISOString()
  });

  await saveState();
  event.currentTarget.reset();
  renderStats();
  renderIdeas();
}

async function handleProjectSubmit(event) {
  event.preventDefault();

  const formData = new FormData(event.currentTarget);
  const nextAction = String(formData.get("nextAction") || "").trim();
  const newProject = {
    id: crypto.randomUUID(),
    title: String(formData.get("title") || "").trim(),
    status: formData.get("status"),
    deadline: String(formData.get("deadline") || "").trim(),
    summary: String(formData.get("summary") || "").trim(),
    nextAction,
    progress: Number(formData.get("progress")),
    notes: "",
    papers: [],
    tasks: [
      {
        id: crypto.randomUUID(),
        text: nextAction || t("defaultTaskText"),
        done: false
      }
    ]
  };

  state.projects.unshift(newProject);
  state.selectedProjectId = newProject.id;

  resetProjectForm();
  elements.statusFilter.value = "all";
  elements.projectModal.close();
  render();
  showToast(t("projectCreatedToast"));

  try {
    await saveState();
    renderStaticText();
  } catch (error) {
    console.warn("Project was added in the UI, but saving or syncing failed.", error);
    runtime.syncStatusKey = "syncFailed";
    renderStaticText();
  }
}

async function handlePaperSubmit(event, projectId) {
  event.preventDefault();

  const formData = new FormData(event.currentTarget);
  const pdfFile = formData.get("pdf");
  const link = String(formData.get("link") || "").trim();
  const hasPdf = pdfFile instanceof File && pdfFile.size > 0;

  if (!link && !hasPdf) {
    window.alert(t("paperRequiredSource"));
    return;
  }

  const paperId = crypto.randomUUID();
  let paperMeta = {
    fileName: "",
    pdfId: ""
  };

  if (hasPdf) {
    paperMeta = await savePaperFile(paperId, pdfFile);
  }

  const newPaper = {
    id: paperId,
    title: String(formData.get("title")).trim(),
    journal: String(formData.get("journal")).trim(),
    year: String(formData.get("year")).trim(),
    link,
    ...paperMeta
  };

  state.projects = state.projects.map((project) => {
    if (project.id !== projectId) {
      return project;
    }

    return {
      ...project,
      papers: [newPaper, ...(project.papers || [])]
    };
  });

  await saveState();
  renderProjectDetail();
}

async function toggleTask(projectId, taskId, done) {
  state.projects = state.projects.map((project) => {
    if (project.id !== projectId) {
      return project;
    }

    const tasks = project.tasks.map((task) => (task.id === taskId ? { ...task, done } : task));
    const doneCount = tasks.filter((task) => task.done).length;
    const progress = tasks.length ? Math.round((doneCount / tasks.length) * 100) : project.progress;

    return {
      ...project,
      tasks,
      progress
    };
  });

  await saveState();
  renderStats();
  renderProjects();
  renderProjectDetail();
  renderFocusCard();
}

async function updateProjectStatus(projectId, status) {
  state.projects = state.projects.map((project) =>
    project.id === projectId ? { ...project, status } : project
  );

  await saveState();
  renderProjects();
  renderProjectDetail();
  renderFocusCard();
}

async function deleteProject(projectId) {
  if (!window.confirm(t("deleteProjectConfirm"))) {
    return;
  }

  state.projects = state.projects.filter((project) => project.id !== projectId);
  state.ideas = state.ideas.map((idea) =>
    idea.projectId === projectId ? { ...idea, projectId: "" } : idea
  );
  state.selectedProjectId = state.projects[0]?.id || "";

  await saveState();
  render();
}

async function deleteIdea(ideaId) {
  if (!window.confirm(t("deleteIdeaConfirm"))) {
    return;
  }

  state.ideas = state.ideas.filter((idea) => idea.id !== ideaId);
  await saveState();
  renderStats();
  renderIdeas();
}

async function handleLanguageChange(event) {
  state.language = event.target.value;
  await saveState({ sync: false });
  render();
}

async function handleChooseSyncFolder() {
  if (!runtime.isDesktop) {
    return;
  }

  try {
    const result = await window.desktopAPI.chooseSyncDirectory();
    runtime.syncDirectory = result.syncDirectory || "";
    runtime.syncStatusKey = runtime.syncDirectory ? "syncDesktopReady" : "syncDesktopNoFolder";
    await saveState();
    renderStaticText();
  } catch (error) {
    console.warn("Could not choose sync directory.", error);
    runtime.syncStatusKey = "syncFailed";
    renderStaticText();
  }
}

async function handleSyncNow() {
  if (!runtime.isDesktop) {
    renderStaticText();
    return;
  }

  try {
    const result = await window.desktopAPI.syncNow({ state });
    state = normalizeState(result.state);
    runtime.syncDirectory = result.syncDirectory || runtime.syncDirectory;
    runtime.lastSyncedAt = result.lastSyncedAt || new Date().toISOString();
    runtime.syncStatusKey = runtime.lastSyncedAt ? "syncSuccess" : "syncDesktopReady";
    render();
  } catch (error) {
    console.warn("Sync failed.", error);
    runtime.syncStatusKey = "syncFailed";
    renderStaticText();
  }
}

function startAutoSync() {
  if (!runtime.isDesktop || runtime.autoSyncTimer) {
    return;
  }

  runtime.autoSyncTimer = window.setInterval(async () => {
    try {
      const result = await window.desktopAPI.syncNow({ state });
      state = normalizeState(result.state);
      runtime.syncDirectory = result.syncDirectory || runtime.syncDirectory;
      runtime.lastSyncedAt = result.lastSyncedAt || new Date().toISOString();
      runtime.syncStatusKey = runtime.lastSyncedAt ? "autoSyncSuccess" : "syncDesktopReady";
      render();
    } catch (error) {
      console.warn("Auto-sync failed.", error);
      runtime.syncStatusKey = "syncFailed";
      renderStaticText();
    }
  }, AUTO_SYNC_INTERVAL_MS);
}

function resetProjectForm() {
  elements.projectForm.reset();
  elements.projectForm.elements.status.value = "planning";
  elements.projectForm.elements.progress.value = "20";
}

function showToast(message) {
  elements.appToast.textContent = message;
  elements.appToast.classList.add("visible");

  window.clearTimeout(runtime.toastTimer);
  runtime.toastTimer = window.setTimeout(() => {
    elements.appToast.classList.remove("visible");
  }, 2600);
}

function renderPaperList(project) {
  const papers = [...(project.papers || [])].sort((first, second) => Number(second.year) - Number(first.year));

  if (!papers.length) {
    return `<div class="empty-state-card">${t("noPapers")}</div>`;
  }

  return papers
    .map((paper) => {
      const actions = [];

      if (paper.link) {
        actions.push(
          `<a class="ghost-button compact-button paper-action" href="${paper.link}" target="_blank" rel="noreferrer">${t("openLinkButton")}</a>`
        );
      }

      if (paper.fileName || paper.pdfId) {
        actions.push(
          `<button type="button" class="ghost-button compact-button paper-action" data-open-pdf="${paper.id}">${t("openPdfButton")}</button>`
        );
      }

      return `
        <article class="paper-card">
          <div class="paper-card-top">
            <div>
              <h5>${paper.title}</h5>
              <p>${paper.journal}</p>
            </div>
            <span class="paper-year">${paper.year}</span>
          </div>
          <div class="paper-actions">
            ${actions.join("")}
            ${paper.fileName ? `<span class="paper-badge">${t("paperFileBadge")}: ${paper.fileName}</span>` : ""}
          </div>
        </article>
      `;
    })
    .join("");
}

async function savePaperFile(paperId, file) {
  if (runtime.isDesktop) {
    const buffer = Array.from(new Uint8Array(await file.arrayBuffer()));
    const result = await window.desktopAPI.savePdf({
      paperId,
      fileName: file.name,
      bytes: buffer
    });

    return {
      fileName: result.fileName,
      pdfId: ""
    };
  }

  const pdfId = crypto.randomUUID();
  await saveBrowserPdf(pdfId, file);
  return {
    fileName: file.name,
    pdfId
  };
}

async function openPaperPdf(paperId) {
  const project = getSelectedProject();
  const paper = (project?.papers || []).find((item) => item.id === paperId);
  if (!paper) {
    return;
  }

  if (runtime.isDesktop && paper.fileName) {
    await window.desktopAPI.openPdf({ fileName: paper.fileName });
    return;
  }

  if (paper.pdfId) {
    const file = await loadBrowserPdf(paper.pdfId);
    if (!file) {
      return;
    }

    const objectUrl = URL.createObjectURL(file);
    window.open(objectUrl, "_blank", "noopener,noreferrer");
    window.setTimeout(() => URL.revokeObjectURL(objectUrl), 60_000);
  }
}

function getSelectedProject() {
  return state.projects.find((project) => project.id === state.selectedProjectId) || state.projects[0];
}

function normalizeState(rawState) {
  return {
    ...rawState,
    language: supportedLanguages.includes(rawState.language) ? rawState.language : DEFAULT_LANGUAGE,
    updatedAt: rawState.updatedAt || new Date().toISOString(),
    projects: (rawState.projects || []).map((project) => ({
      ...project,
      tasks: project.tasks || [],
      papers: (project.papers || []).map((paper) => ({
        ...paper,
        fileName: paper.fileName || "",
        pdfId: paper.pdfId || ""
      }))
    })),
    ideas: rawState.ideas || []
  };
}

function replaceLeadingText(element, value) {
  const textNode = Array.from(element.childNodes).find((node) => node.nodeType === Node.TEXT_NODE);
  if (textNode) {
    textNode.textContent = value;
    return;
  }

  element.textContent = value;
}

function getSyncStatusCopy() {
  if (runtime.syncStatusKey === "syncSuccess" && runtime.lastSyncedAt) {
    return t("syncSuccess", { time: formatDateTime(runtime.lastSyncedAt) });
  }

  if (runtime.syncStatusKey === "autoSyncSuccess" && runtime.lastSyncedAt) {
    return t("autoSyncSuccess", { time: formatDateTime(runtime.lastSyncedAt) });
  }

  if (runtime.syncStatusKey === "syncDesktopReady" && runtime.syncDirectory) {
    return t("syncDesktopReady", { path: runtime.syncDirectory });
  }

  return t(runtime.syncStatusKey);
}

function t(key, variables = {}) {
  const dictionary = translations[state.language] || translations[DEFAULT_LANGUAGE];
  const template = dictionary[key] || translations[DEFAULT_LANGUAGE][key] || key;
  return Object.entries(variables).reduce(
    (text, [variable, value]) => text.replace(`{${variable}}`, value),
    template
  );
}

function getStatusLabel(status) {
  return t(`status${status.charAt(0).toUpperCase()}${status.slice(1)}`);
}

function renderStatusOptions(selectedStatus) {
  return ["planning", "active", "waiting", "writing", "submitted", "finished"]
    .map((status) => `<option value="${status}" ${status === selectedStatus ? "selected" : ""}>${getStatusLabel(status)}</option>`)
    .join("");
}

function getLocale() {
  return state.language === "zh" ? "zh-Hans" : "en";
}

function formatDate(dateString) {
  if (!dateString) {
    return t("noDeadline");
  }

  return new Intl.DateTimeFormat(getLocale(), {
    month: "short",
    day: "numeric",
    year: "numeric"
  }).format(new Date(dateString));
}

function formatDateTime(dateString) {
  return new Intl.DateTimeFormat(getLocale(), {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit"
  }).format(new Date(dateString));
}

function daysUntil(dateString) {
  if (!dateString) {
    return Number.POSITIVE_INFINITY;
  }

  const today = new Date();
  const target = new Date(dateString);
  return Math.ceil((target - today) / (1000 * 60 * 60 * 24));
}

function openPdfDatabase() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(PDF_DB_NAME, 1);

    request.onupgradeneeded = () => {
      const database = request.result;
      if (!database.objectStoreNames.contains(PDF_STORE_NAME)) {
        database.createObjectStore(PDF_STORE_NAME);
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

async function saveBrowserPdf(id, file) {
  const database = await openPdfDatabase();

  return new Promise((resolve, reject) => {
    const transaction = database.transaction(PDF_STORE_NAME, "readwrite");
    transaction.objectStore(PDF_STORE_NAME).put(file, id);
    transaction.oncomplete = () => resolve();
    transaction.onerror = () => reject(transaction.error);
  });
}

async function loadBrowserPdf(id) {
  const database = await openPdfDatabase();

  return new Promise((resolve, reject) => {
    const transaction = database.transaction(PDF_STORE_NAME, "readonly");
    const request = transaction.objectStore(PDF_STORE_NAME).get(id);
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}
