import { app, shell, BrowserWindow, ipcMain } from 'electron'
import path from 'node:path'
import { createFileRoute, createURLRoute } from 'electron-router-dom'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'

function createWindow(): void {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 900,
    height: 670,
    show: false,
    autoHideMenuBar: true,
    backgroundColor: '##17141f',
    titleBarStyle: 'hiddenInset',
    trafficLightPosition: {
      x: 20,
      y: 20,
    },
    ...(process.platform === 'linux'
      ? { icon: path.join(__dirname, '../../build/icon.png') }
      : {}),
    webPreferences: {
      preload: path.join(__dirname, '../preload/index.js'),
      sandbox: false,
    },
  })

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  const devServerURL = createURLRoute(
    process.env.ELECTRON_RENDERER_URL!,
    'main',
  )

  const fileRoute = createFileRoute(
    path.join(__dirname, '../renderer/index.html'),
    'main',
  )

  if (is.dev && process.env.ELECTRON_RENDERER_URL) {
    mainWindow.loadURL(devServerURL)
  } else {
    mainWindow.loadFile(fileRoute)
  }
}

if (process.platform === 'darwin') {
  app.dock.setIcon(path.resolve(__dirname, 'icon.png'))
  // ou seja, se o sistema for darwin(que é o macOS), teremos acesso ao dock que é
  // uma api só do macOS. usamos entao o setIcon do dock pra setar o cione como o icon.png
  // que estará dentro da pasta out(que pega o icon la de resources)
}

app.whenReady().then(() => {
  electronApp.setAppUserModelId('com.electron')
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  ipcMain.on('ping', () => console.log('pong'))

  createWindow()

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
