// import irsdk from 'node-irsdk-mjo';
import {app, BrowserWindow, ipcMain, globalShortcut} from 'electron';
import {createRequire} from 'node:module';
import {fileURLToPath} from 'node:url';
import path from 'node:path';
import {spawn} from 'child_process';

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

const sizes: { [key: string]: { width: number, height: number } } = {
  Standings: {
    width: 560,
    height: 0,
  },
  Debug: {
    width: 1920,
    height: 1080,
  }
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
    transparent: false,
    frame: true,
    // titleBarStyle: 'hidden',
    // titleBarStyle: 'customButtonsOnHover',
    webPreferences: {
      preload: path.join(__dirname, 'preload.mjs'),
    },
  });
  // win.setBackgroundColor('#ff000020');
  // win.setBackgroundMaterial('acrylic');
  // win.setMenu(null);
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

  runPyScript(win.webContents);

});

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
  // boxWin.setSize(sizes[name].width, sizes[name].height);
  boxWin.setSize(480, 500);
  boxWin.setPosition(1900, 50);
  boxWin.resizable = false;
  boxWin.setAlwaysOnTop(true, 'pop-up-menu');
  // boxWin.setMenu(null);
  boxWin.setBackgroundColor('#00000000');
  // boxWin.setSkipTaskbar(true);
  await boxWin.loadURL(process.env.VITE_DEV_SERVER_URL + 'StandingsWrapper');
  ipcMain.on('set-height', (event, args) => {
    if (!boxes[args.name]) return;
    const currentWidth = boxes[args.name]?.getSize()[0];
    // console.log(currentWidth, args.height);
    boxes[args.name]?.setSize(currentWidth ?? 0, args.height);
  });
};

const closeBox = async (name: string) => {
  if (!boxes[name]) return;
  boxes[name]?.close();
};

const runPyScript = (webContents: Electron.WebContents) => {
  const scriptPath = './src/ir.py';
  const interval = '30';
  const python = spawn('python', [scriptPath, interval]);
  python.stdout.on('data', (data) => {
    webContents.send('iracing-data', data.toString());
  });
  python.stderr.on('data', (data) => {
    // webContents.send('iracing-session-py', data.toString());
  });
};
