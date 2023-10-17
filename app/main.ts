import {app, BrowserWindow, screen, ipcMain} from 'electron';
import * as path from 'path';
import * as fs from 'fs';
import { setupTitlebar, attachTitlebarToWindow } from "custom-electron-titlebar/main";

setupTitlebar();

let win: BrowserWindow | null = null;
const args = process.argv.slice(1),
  serve = args.some(val => val === '--serve');

function createWindow(): BrowserWindow {

  const size = screen.getPrimaryDisplay().workAreaSize;

  const WINDOW_WIDTH = 800; // size.width
  const WINDOW_HEIGHT = 1100; // size.height

  //Definindo centro da tela principal
  let bounds = screen.getPrimaryDisplay().bounds;
  let x = bounds.x + ((bounds.width - WINDOW_WIDTH) / 2);
  let y = bounds.y + ((bounds.height - WINDOW_HEIGHT) / 2);


  // Create the browser window.
  const windowOptions: Electron.BrowserWindowConstructorOptions = {
    x: Math.round(x),
    y: Math.round(y),
    width: WINDOW_WIDTH,
    height: WINDOW_HEIGHT,
    frame: false,
    titleBarStyle: 'hidden',
		titleBarOverlay: true,
    webPreferences: {
      sandbox: false,
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true,
      allowRunningInsecureContent: (serve),
      contextIsolation: true
    },
  };
  
  win = new BrowserWindow(windowOptions);

  if (serve) {
    const debug = require('electron-debug');
    debug();

    require('electron-reloader')(module);
    win.loadURL('http://localhost:4200');
  } else {
    // Path when running electron executable
    let pathIndex = './index.html';

    if (fs.existsSync(path.join(__dirname, '../dist/index.html'))) {
       // Path when running electron in local folder
      pathIndex = '../dist/index.html';
    }

    const url = new URL(path.join('file:', __dirname, pathIndex));
    win.loadURL(url.href);
  }

  // Emitted when the window is closed.
  win.on('closed', () => {
    // Dereference the window object, usually you would store window
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null;
  });

  attachTitlebarToWindow(win);

  return win;
}

try {
  // This method will be called when Electron has finished
  // initialization and is ready to create browser windows.
  // Some APIs can only be used after this event occurs.
  // Added 400 ms to fix the black background issue while using transparent window. More detais at https://github.com/electron/electron/issues/15947
  app.on('ready', () => setTimeout(createWindow, 400));

  // Quit when all windows are closed.
  app.on('window-all-closed', () => {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
      app.quit();
    }
  });

  app.on('activate', () => {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (win === null) {
      createWindow();
    }
  });

} catch (e) {
  // Catch Error
  // throw e;
}

