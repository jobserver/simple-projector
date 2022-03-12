const { app,ipcMain,BrowserWindow,screen } = require('electron')
const {createWindow1,createWindow2} = require('./helpers/setScreens');

  app.on('ready', () => {
    window1 = createWindow1();
    window2 = createWindow2();

    ipcMain.on('nameMsg', (event, arg) => {
      console.log("name inside main process is: ", arg); // this comes form within window 1 -> and into the mainProcess
      event.sender.send('nameReply', { }) // sends back/replies to window 1 - "event" is a reference to this chanel.
      window2.webContents.send( 'forWin2', arg ); // sends the stuff from Window1 to Window2.
    });

    ipcMain.on('abrirProjetor',(event,arg)=>{
      window2 = createWindow2();
    })
  
    ipcMain.on('getMonitores',(event,arg)=>{
      const monitores = screen.getAllDisplays();
      const externalDisplay = monitores.find((display) => {
        return display.bounds.x !== 0 || display.bounds.y !== 0
      });

      event.sender.send('monitoresReply', monitores) 
    })
});