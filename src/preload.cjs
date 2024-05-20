const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  onSaveData: (callback) => ipcRenderer.on('save-data', (event, data) => callback(data)),
  saveData: (data) => ipcRenderer.invoke('save-data', data),
  loadData: () => ipcRenderer.invoke('load-data'),
  onMenuSave: (callback) => ipcRenderer.on('menu-save', (event) => callback()),
  onMenuLoad: (callback) => ipcRenderer.on('menu-load', (event) => callback()),
  send: (channel, data) => {
    let validChannels = ['toMain'];
    if (validChannels.includes(channel)) {
      ipcRenderer.send(channel, data);
    }
  },
  receive: (channel, func) => {
    let validChannels = ['fromMain'];
    if (validChannels.includes(channel)) {
      ipcRenderer.on(channel, (event, ...args) => func(...args));
    }
  },
  toggleDarkMode: (isDark) => ipcRenderer.send('toggle-dark-mode', isDark),
  getDarkMode: () => ipcRenderer.invoke('get-dark-mode'),
  onToggleTheme: (callback) => ipcRenderer.on('toggle-theme', (event, isDark) => callback(isDark)),
});