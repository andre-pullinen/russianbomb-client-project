"use strict";

import {
  app,
  protocol,
  BrowserWindow,
  ipcMain,
  shell,
  Notification
} from "electron";
import { createProtocol } from "vue-cli-plugin-electron-builder/lib";
import installExtension, { VUEJS_DEVTOOLS } from "electron-devtools-installer";
import path from "path";
import fse from "fs-extra";
import Alert from "electron-alert";
const isDevelopment = process.env.NODE_ENV !== "production";

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
  {
    scheme: "rb",
    privileges: {
      secure: true,
      standard: true,
      corsEnabled: false
    }
  }
]);

app.setAsDefaultProtocolClient("rb");

function isSafeForExternalOpen(url) {
  return url.startsWith("http:") || url.startsWith("https:");
}

let basename;
basename = path.basename(path.dirname(__dirname));

const userDataPath = path.join(
  app.getPath("userData"),
  "Pepper Data\\Shockwave Flash\\WritableRoot\\#SharedObjects\\36U2VJ3T\\macromedia.com\\support\\flashplayer\\sys",
  "settings.sol"
);
let srcFile;

if (basename === "resources") {
  srcFile = path.join(__dirname, "..", "settings.sol");
} else {
  srcFile = path.join(__dirname, "settings.sol");
}

// File will be created or overwritten by default.
fse.copySync(srcFile, userDataPath);

let ppapi_flash_path;
const ppapi_flash_name =
  process.arch === "x64" ? "pepflashplayer.dll" : "pepflashplayer32.dll";

if (process.platform === "win32") {
  if (basename === "resources") {
    ppapi_flash_path = path.join(__dirname, "..", ppapi_flash_name);
  } else {
    ppapi_flash_path = path.join(__dirname, ppapi_flash_name);
  }
} else if (process.platform === "linux") {
  ppapi_flash_path = path.join(__dirname, "libpepflashplayer.so");
} else if (process.platform === "darwin") {
  ppapi_flash_path = path.join(__dirname, "PepperFlashPlayer.plugin");
}

app.commandLine.appendSwitch("ppapi-flash-path", ppapi_flash_path);
app.commandLine.appendSwitch("ppapi-flash-version", "30.0.0.154");

async function createWindow() {
  // Create the browser window.
  const win = new BrowserWindow({
    width: 1125,
    height: 695,
    frame: false,
    show: false,
    minWidth: 1125,
    minHeight: 695,
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true, // <--- added
      zoomFactor: 1.0,
      plugins: true,
      webSecurity: false
    }
  });

  win.once("ready-to-show", () => {
    win.webContents.setZoomFactor(1);
    win.show();
  });

  win.on("resize", function() {
    win.webContents.send("resize");
  });
  const maximize = function() {
    win.webContents.send("max-btn");
  };
  win.on("maximize", maximize);
  win.on("unmaximize", maximize);

  ipcMain.on("close", () => {
    win.close();
  });
  ipcMain.on("alert", (event, args) => {
    let alert = new Alert();

    alert.fire(args.swalOptions, args.bwOptions, win, false, true);
  });
  ipcMain.on("notify", (e, data) => {
    if (win.isFocused()) return;
    const settings = {
      title: data.text,
      body: data.desc
    };
    let notification = new Notification(settings);

    notification.on("click", () => {
      win.flashFrame(false);
      win.show();
    });

    win.flashFrame(true);
    notification.show();
  });
  ipcMain.on("min", () => win.minimize());
  ipcMain.on("max", () => {
    if (win.isMaximized()) {
      win.unmaximize();
    } else {
      win.maximize();
    }
  });

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    await win.loadURL(process.env.WEBPACK_DEV_SERVER_URL);
    if (!process.env.IS_TEST) win.webContents.openDevTools();
  } else {
    createProtocol("rb");
    // Load the index.html when not in development
    win.loadURL("rb://./index.html");
    //win.webContents.openDevTools();
    //win.loadURL("https://www.macromedia.com/support/documentation/en/flashplayer/help/settings_manager04.html");
  }
}

// Quit when all windows are closed.
app.on("window-all-closed", () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});

app.on("web-contents-created", (event, contents) => {
  contents.addListener("new-window", (event, url) => {
    event.preventDefault();
    // In this example, we'll ask the operating system
    // to open this event's url in the default browser.
    //
    // See the following item for considerations regarding what
    // URLs should be allowed through to shell.openExternal.
    if (isSafeForExternalOpen(url)) {
      setImmediate(() => {
        shell.openExternal(url);
      });
    }
  });
});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", async () => {
  if (isDevelopment && !process.env.IS_TEST) {
    // Install Vue Devtools
    try {
      await installExtension(VUEJS_DEVTOOLS);
    } catch (e) {
      console.error("Vue Devtools failed to install:", e.toString());
    }
  }
  createWindow();
});

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
  if (process.platform === "win32") {
    process.on("message", data => {
      if (data === "graceful-exit") {
        app.quit();
      }
    });
  } else {
    process.on("SIGTERM", () => {
      app.quit();
    });
  }
}
