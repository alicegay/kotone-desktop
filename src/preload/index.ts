import { contextBridge, ipcRenderer } from 'electron'
import { SetActivity } from '@xhayper/discord-rpc'
import liquidGlass from 'electron-liquid-glass'

const api = {
  rpc: {
    login: () => ipcRenderer.send('rpc.login'),
    ready: (callback: () => void) =>
      ipcRenderer.on('rpc.ready', () => callback()),
    setActivity: (activity: SetActivity) =>
      ipcRenderer.send('rpc.setActivity', activity),
    clearActivity: () => ipcRenderer.send('rpc.clearActivity'),
  },
  glass: liquidGlass.isGlassSupported(),
}

if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', true)
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = true
  // @ts-ignore (define in dts)
  window.api = api
}
