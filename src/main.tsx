import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import {store} from './store/store.ts';
import {Provider} from 'react-redux';
ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store} >
    <App />
  </Provider>
);

// Use contextBridge
// window.ipcRenderer.on('main-process-message', (_event, message) => {
//   console.log(message);
// });
