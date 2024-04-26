import { ipcRenderer, contextBridge } from 'electron';

contextBridge.exposeInMainWorld('iRacing', {
  data: (callBack: (m: string) => string) => ipcRenderer.on('iracing-data', (_event, message) => callBack(message))
});

contextBridge.exposeInMainWorld('openNewWindow', () => ipcRenderer.send('open-new-window'));
