import { app, BrowserWindow, dialog, ipcMain, shell } from "electron";
import path from "node:path";

// The built directory structure
//
// ├─┬─┬ dist
// │ │ └── index.html
// │ │
// │ ├─┬ dist-electron
// │ │ ├── main.js
// │ │ └── preload.js
// │

if (process.defaultApp) {
  if (process.argv.length >= 2) {
    app.setAsDefaultProtocolClient("dashboard", process.execPath, [
      path.resolve(process.argv[1]),
    ]);
  }
} else {
  app.setAsDefaultProtocolClient("dashboard");
}

process.env.DIST = path.join(__dirname, "../dist");
process.env.PUBLIC = app.isPackaged
  ? process.env.DIST
  : path.join(process.env.DIST, "../public");

let win: BrowserWindow | null;
// 🚧 Use ['ENV_NAME'] avoid vite:define plugin - Vite@2.x
const VITE_DEV_SERVER_URL = process.env["VITE_DEV_SERVER_URL"];

function createWindow() {
  win = new BrowserWindow({
    width: 2500,
    height: 1500,
    icon: path.join(process.env.PUBLIC, "electron-vite.svg"),
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      webviewTag: true,
    },
  });

  // Test active push message to Renderer-process.
  ipcMain.on("item:add", function (e, item) {
    win.webContents.on("did-finish-load", () => {
      win.webContents.send("item:add", item);
    });
  });

  if (VITE_DEV_SERVER_URL) {
    win.loadURL(VITE_DEV_SERVER_URL);
  } else {
    // win.loadFile('dist/index.html')
    win.loadFile(path.join(process.env.DIST, "index.html"));
  }
}
// const gotTheLock = app.requestSingleInstanceLock();

// if (!gotTheLock) {
//   app.quit();
// } else {

//   });
// }
ipcMain.on("open-external-browser", (event, data) => {
  shell.openExternal(data);
});

const gotTheLock = app.requestSingleInstanceLock();

if (!gotTheLock) {
  app.quit();
} else {

  app.on("second-instance", (event, commandLine, workingDirectory) => {
    const uid = commandLine?.find((e) => e.includes("authuid"))?.split("=")[1];

    const googleToken = commandLine
      ?.find((e) => e.includes("oauthIdToken"))
      ?.split("=")[1];
    const facebookToken = commandLine
      ?.find((e) => e.includes("facebookIdToken"))
      ?.split("=")[1];
    const microsoftToken = commandLine
      ?.find((e) => e.includes("microsoftIdToken"))
      ?.split("=")[1];

    if (win) {
      if (win.isMinimized()) win.restore();
      win.focus();
    }

    if (uid) {
      console.log("uid", uid);
      ipcMain.emit("uid", uid);
      win.webContents.send("uid", uid);
      return;
    }
    if (facebookToken) {
      console.log("facebookAuthIdToken");
      ipcMain.emit("facebookAuthIdToken", facebookToken);
      win.webContents.send("facebookAuthIdToken", facebookToken);
      return;
    } else if (microsoftToken) {
      console.log("microsoftAuthIdToken");
      ipcMain.emit("microsoftAuthIdToken", microsoftToken);
      win.webContents.send("microsoftAuthIdToken", microsoftToken);
      return;
    }
    console.log("oauthIdToken");
    ipcMain.emit("oauthIdToken", googleToken);
    win.webContents.send("oauthIdToken", googleToken);
  });



  app.on("open-url", (event, url) => {
    console.log("Received custom protocol URL:", url);
    const token = new URL(url).searchParams.get("authuid");
    console.log("OAuth ID Token:", token);
    win.webContents.send("uid", token);
    ipcMain.emit("uid", token);

    // ...
  });

  app.on("window-all-closed", () => {
    win = null;
  });
}
app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
