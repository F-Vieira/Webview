const { app, BrowserWindow, globalShortcut } = require("electron");
const config = require("./config");

let win;

const createWindow = () => {
  win = new BrowserWindow({
    width: 800,
    height: 600,
    titleBarStyle: "hidden",
    alwaysOnTop: true,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  win.loadURL(config.url);
};

const toggleDevTools = () => {
  win.webContents.toggleDevTools();
};

const createShortCuts = () => {
  globalShortcut.register("CmdOrCtrl+J", toggleDevTools);
};

app.whenReady().then(createWindow).then(createShortCuts);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});
