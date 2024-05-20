const { app, BrowserWindow, ipcMain, Menu } = require('electron');
const path = require('path');
const url = require('url');
const fs = require('fs-extra');
const userDataPath = app.getPath('userData');
const settingsFilePath = path.join(userDataPath, 'settings.json');

let mainWindow;
let isDarkMode = false;

function createWindow () {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        icon: path.join(__dirname, 'public/favicon.png'),
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
            preload: path.join(__dirname, '/src/preload.cjs'),
        },
    });

    const startUrl = process.env.ELECTRON_START_URL || url.format({
        pathname: path.join(__dirname, './dist/index.html'),
        protocol: 'file:',
        slashes: true
    });
    mainWindow.loadURL(startUrl);
    createMenu(mainWindow);

    mainWindow.on('closed', function () {
        mainWindow = null;
    });
}

function createMenu(mainWindow) {
    const template = [
      {
        label: 'File',
        submenu: [
          { label: 'Save Settings', accelerator: 'CmdOrCtrl+S', click: () => mainWindow.webContents.send('menu-save') },
          { label: 'Load Settings', click: () => mainWindow.webContents.send('menu-load') }
        ]
      },
      {
        label: 'View',
        submenu: [
          { label: 'Chart', click: () => mainWindow.webContents.send('navigate', '/chart') },
          { label: 'Table', click: () => mainWindow.webContents.send('navigate', '/table') },
          { label: 'Impressum', click: () => mainWindow.webContents.send('navigate', '/impressum') }
        ]
      },
      {
        label: 'Window',
        submenu: [
          {
            label: 'Toggle Dark Mode',
            click: () => {
              isDarkMode = !isDarkMode;
              mainWindow.webContents.send('toggle-theme', isDarkMode);
            }
          },
          { role: 'windowMenu' }
        ]
      },
      {
        label: 'Help',
        role: 'help',
        submenu: [
          { label: 'Learn More', click: () => require('electron').shell.openExternal('https://electronjs.org') },
          { role: 'toggledevtools', label: 'Toggle Developer Tools' }, // This adds the Dev Tools toggle option
        ]
      }
    ];
  
    const menu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(menu);
  }
  
  app.whenReady().then(createWindow);
  
  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
  });
  
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });

 
// IPC to handle save data
ipcMain.handle('save-data', async (event, data) => {
    console.log('Data received to save (sync):', data);
    await fs.promises.writeFile(settingsFilePath, JSON.stringify(data));
    return 'Data saved';
});
  
  // Handle loading data
  ipcMain.handle('load-data', async () => {
    try {
      // Check if the file exists first
      if (await fs.pathExists(settingsFilePath)) {
        const data = await fs.readJson(settingsFilePath);
        console.log("Data loaded successfully:", data);
        return data;
      } else {
        const defaultData = {}; 
        await fs.writeJson(settingsFilePath, defaultData); // Optionally create the file with default data
        return defaultData;
      }
    } catch (error) {
      console.error('Failed to load data:', error);
      return {}; 
    }
  });

// Handle dark mode toggle
ipcMain.on('toggle-dark-mode', (event, isDark) => {
  isDarkMode = isDark;
  mainWindow.webContents.send('toggle-theme', isDarkMode);
});

// Handle getting the dark mode state
ipcMain.handle('get-dark-mode', () => {
  return isDarkMode;
});