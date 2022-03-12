const { app,ipcMain,BrowserWindow,screen } = require('electron')
const path = require('path');

module.exports = {
     createWindow1() {
        window1 = new BrowserWindow({width: 800,height: 600,autoHideMenuBar:true,
          webPreferences: {
          nodeIntegration: true,
          //webSecurity: false,
            plugins: true
        }})
        
        window1.maximize()
        window1.loadURL(`file://${path.resolve()}/src/views/window1.html`)
        // window1.webContents.openDevTools()
        window1.on('closed', function () {
           window1 = null
           app.quit()
        })
        return window1
      },

      createWindow2() {
        const monitores = screen.getAllDisplays();
        const externo = monitores.find((display) => {
          return display.bounds.x !== 0 || display.bounds.y !== 0
        });
    
        window2 = new BrowserWindow({fullscreen:true,x: externo.bounds.x, y: externo.bounds.y,autoHideMenuBar:true,
          webPreferences: {
          nodeIntegration: true,
          //webSecurity: false,
            plugins: true
        }})
        window2.loadURL(`file://${path.resolve()}/src/views/window2.html`)
        // window2.webContents.openDevTools()
        window2.on('closed', function () {
          window2 = null
        })
        return window2
      }
}