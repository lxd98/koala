const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("desktopAPI", {
  loadAppData: (payload) => ipcRenderer.invoke("desktop:load-app-data", payload),
  saveAppData: (payload) => ipcRenderer.invoke("desktop:save-app-data", payload),
  chooseSyncDirectory: () => ipcRenderer.invoke("desktop:choose-sync-directory"),
  syncNow: (payload) => ipcRenderer.invoke("desktop:sync-now", payload),
  savePdf: (payload) => ipcRenderer.invoke("desktop:save-pdf", payload),
  openPdf: (payload) => ipcRenderer.invoke("desktop:open-pdf", payload)
});
