const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  invokeSave: (data) => ipcRenderer.send('invoke-save', data),
  onSaveData: (callback) => ipcRenderer.on('save-data', (event, data) => callback(data)),
  saveData: (data) => ipcRenderer.invoke('save-data', data),
  loadData: () => ipcRenderer.invoke('load-data'),
  onMenuSave: (callback) => ipcRenderer.on('menu-save', (event) => callback()),
  onMenuLoad: (callback) => ipcRenderer.on('menu-load', (event) => callback()),
  onSettingsLoaded: (callback) => ipcRenderer.on('settings-loaded', (event, data) => callback(data))
});
