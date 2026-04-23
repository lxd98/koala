# Research Project Compass

A cross-platform desktop app for managing projects, ideas, tasks, and related papers.

## Current shape

- Electron desktop app for macOS, Windows, and Linux
- Local-first storage on disk for projects and paper metadata
- PDF storage on disk instead of browser-only storage
- Optional sync through a shared folder
- English and Chinese interface

## How sync works

The desktop app can sync through a folder you choose inside a service such as Dropbox, OneDrive, iCloud Drive, Google Drive, or Syncthing.

Each device runs the same app and points to the same cloud-synced folder. The app stores:

- `state.json` for projects, ideas, and paper metadata
- a `pdfs/` folder for attached papers

This keeps the setup simple and cross-platform without locking you into one cloud backend.

## Run locally

1. Install dependencies:

```bash
npm install
```

2. Start the desktop app:

```bash
npm start
```

## Build installers

```bash
npm run dist
```

Electron Builder is configured to produce:

- `dmg` for macOS
- `nsis` installer for Windows
- `AppImage` and `deb` for Linux

## Project structure

- [index.html](/Users/raymond/Desktop/project%20manage/index.html): renderer markup
- [style.css](/Users/raymond/Desktop/project%20manage/style.css): app styling
- [app.js](/Users/raymond/Desktop/project%20manage/app.js): renderer logic and UI state
- [electron/main.js](/Users/raymond/Desktop/project%20manage/electron/main.js): Electron entry point
- [electron/preload.js](/Users/raymond/Desktop/project%20manage/electron/preload.js): secure bridge between renderer and desktop APIs
- [electron/storage.js](/Users/raymond/Desktop/project%20manage/electron/storage.js): local file storage and sync-folder logic

## Notes

- Sync currently uses a simple last-write-wins strategy based on `updatedAt`
- Browser mode still works for quick preview, but folder sync and file-backed PDFs are intended for the desktop app
- The next high-value upgrade would be edit/delete for projects, ideas, and papers, plus conflict history for sync
