import {ipcRenderer, contextBridge} from 'electron';
contextBridge.exposeInMainWorld('iracing', {
  // telemetry: (callBack: (data: any) => any) => ipcRenderer.on('iracing-telemetry', (_event, data) => callBack(data)),
  // session: (callBack: (data: any) => any) => ipcRenderer.on('iracing-session', (_event, data) => callBack(data)),
  // telemetryPy: (callBack: (data: any) => any) => ipcRenderer.on('iracing-telemetry-py', (_event, data) => callBack(data)),
  // sessionPy: (callBack: (data: any) => any) => ipcRenderer.on('iracing-session-py', (_event, data) => callBack(data))
  data : (callBack: (data: any) => any) => ipcRenderer.on('iracing-data', (_event, data) => callBack(data))
});

contextBridge.exposeInMainWorld('box', {
  open: (name: string) => ipcRenderer.send('open-box', name),
  close: (name: string) => ipcRenderer.send('close-box', name),
  closeAllBoxes: () => ipcRenderer.send('close-all-boxes'),
  debug: () => ipcRenderer.send('debug'),
  placement: (callBack: (param: boolean) => boolean) => ipcRenderer.on('box-placement', (_event, param) => callBack(param)),
  setHeight: (name: string, height: number) => ipcRenderer.send('set-height', {name, height})
});
