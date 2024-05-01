import {ipcRenderer, contextBridge} from 'electron';
contextBridge.exposeInMainWorld('iRacing', {
  telemetry: (callBack: (data: any) => any) => ipcRenderer.on('iracing-telemetry', (_event, data) => callBack(data)),
  session: (callBack: (data: any) => any) => ipcRenderer.on('iracing-session', (_event, data) => callBack(data)),
});

contextBridge.exposeInMainWorld('box', {
  open: (name: string) => ipcRenderer.send('open-box', name),
  close: (name: string) => ipcRenderer.send('close-box', name),
  placement: (callBack: (param: boolean) => boolean) => ipcRenderer.on('box-placement', (_event, param) => callBack(param))
});
