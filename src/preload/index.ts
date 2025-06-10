import { contextBridge, ipcRenderer } from 'electron'
import { SetActivity } from '@xhayper/discord-rpc'

const api = {
  rpc: {
    setActivity: (activity: SetActivity) =>
      ipcRenderer.send('rpc.setActivity', activity),
    clearActivity: () => ipcRenderer.send('rpc.clearActivity'),
  },
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
