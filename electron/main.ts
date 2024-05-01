// import irsdk from 'node-irsdk-2023';
import irsdk from 'node-irsdk-mjo';
import {app, BrowserWindow, ipcMain, globalShortcut} from 'electron';
import {createRequire} from 'node:module';
import {fileURLToPath} from 'node:url';
import path from 'node:path';

const require = createRequire(import.meta.url);
const __dirname = path.dirname(fileURLToPath(import.meta.url));

process.env.APP_ROOT = path.join(__dirname, '..');

// 🚧 Use ['ENV_NAME'] avoid vite:define plugin - Vite@2.x
export const VITE_DEV_SERVER_URL = process.env['VITE_DEV_SERVER_URL'];
path.join(process.env.APP_ROOT, 'dist-electron');
export const RENDERER_DIST = path.join(process.env.APP_ROOT, 'dist');

process.env.VITE_PUBLIC = VITE_DEV_SERVER_URL ? path.join(process.env.APP_ROOT, 'public') : RENDERER_DIST;

let win: BrowserWindow;

const boxes: { [key: string]: BrowserWindow | null } = {
  StandingsWrapper: null,
  Relative: null,
  Speedometer: null,
  Trackmap: null,
  Radar: null,
  FuelIndicator: null
};

let boxPlacement = false;

const createWindow = () => {
  win = new BrowserWindow({
    icon: path.join(process.env.VITE_PUBLIC, 'electron-vite.svg'),
    webPreferences: {
      preload: path.join(__dirname, 'preload.mjs'),
      nodeIntegration: true
    },
  });

  if (VITE_DEV_SERVER_URL) {
    void win.loadURL(VITE_DEV_SERVER_URL);
  } else {
    void win.loadFile(path.join(RENDERER_DIST, 'index.html'));
  }
};

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
    win = null as any;
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

app.on('ready', async () => {
  win = new BrowserWindow({
    icon: path.join(process.env.VITE_PUBLIC, 'electron-vite.svg'),
    webPreferences: {
      preload: path.join(__dirname, 'preload.mjs'),
      nodeIntegration: true,
    },
  });

  ipcMain.on('open-box', async (event, args) => {
    await openBox(args);
  });

  ipcMain.on('close-box', async (event, args) => {
    await closeBox(args);
  });

  globalShortcut.register('F8', () => {
    win.webContents.send('box-placement', boxPlacement = !boxPlacement);
  });

  // win.setMenu(null);
  win.setSize(1000, 800);
  win.setPosition(1550, 500);
  win.resizable = false;
  // win.setAlwaysOnTop(true, 'normal');

  if (VITE_DEV_SERVER_URL) {
    await win.loadURL(VITE_DEV_SERVER_URL);
  } else {
    await win.loadFile(path.join(RENDERER_DIST, 'index.html'));
  }

  init(win.webContents);

});

const init = (webContents: Electron.WebContents) => {
  const ir = irsdk.init({
    telemetryUpdateInterval: 100 ,
    sessionInfoUpdateInterval: 100,
  });
  // iracing.on('Telemetry', (telemetryData) => {
  //   webContents.send('iracing-telemetry', telemetryData);
  // });
  //
  ir.on('SessionInfo', (sessionInfo) => {
    webContents.send('iracing-session', sessionInfo);
    // log local time

  });
  ir.on('Telemetry', function (telemetryData) {
    webContents.send('iracing-telemetry', telemetryData);
  });

  // ir.on('SessionInfo', function (sessionInfo) {
  //   webContents.send('iracing-session', sessionInfo);
  // });
};

const openBox = async (name: string) => {
  const boxWin = new BrowserWindow({
    icon: path.join(process.env.VITE_PUBLIC, 'electron-vite.svg'),
    // parent: win,
    frame: false,
    transparent: true,
    webPreferences: {
      preload: path.join(__dirname, 'preload.mjs'),
      nodeIntegration: true,
    },
  });
  boxes[name] = boxWin;
  boxWin.setSize(600, 300);
  boxWin.setPosition(1900, 50);
  boxWin.resizable = false;
  boxWin.setAlwaysOnTop(true, 'pop-up-menu');
  // boxWin.setMenu(null);
  boxWin.setBackgroundColor('#00000000');
  // boxWin.setSkipTaskbar(true);
  await boxWin.loadURL(process.env.VITE_DEV_SERVER_URL + 'StandingsWrapper');
};

const closeBox = async (name: string) => {
  if (!boxes[name]) return;
  boxes[name]?.close();
};
