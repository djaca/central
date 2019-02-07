'use strict'

import { app, BrowserWindow, Tray } from 'electron'

const path = require('path')

// const assetsDirectory = path.join(__dirname, '../renderer/assets')

let tray = null

/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}

let mainWindow
const winURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:9080`
  : `file://${__dirname}/index.html`

function createWindow () {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    height: 563,
    useContentSize: true,
    width: 1000
  })

  mainWindow.loadURL(winURL)

  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

function createTray () {
  tray = new Tray(path.join(__static, '/trayIcon.png'))
  // tray.setToolTip('Central')

  // const contextMenu = Menu.buildFromTemplate([
  //   { label: 'Quit', click: () => { app.quit() } }
  // ])
  //
  // tray.setContextMenu(contextMenu)

  tray.on('click', event => {
    toggleWindow()
  })

  // tray.on('right-click', toggleWindow)
  // tray.on('double-click', toggleWindow)
  // tray.on('click', function (event) {
  //   toggleWindow()
  //
  //   // Show devtools when command clicked
  //   if (window.isVisible() && process.defaultApp && event.metaKey) {
  //     window.openDevTools({mode: 'detach'})
  //   }
  // })
}

app.on('ready', () => {
  createTray()
  createWindow()
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})

const toggleWindow = () => {
  mainWindow.isVisible() ? mainWindow.hide() : mainWindow.show()
}
