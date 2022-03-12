const { ipcRenderer } = require('electron')

var vm = new Vue({
    el: '#app',
    data:{
        configuracao:{}
    },
    vuetify: new Vuetify(),
  })


ipcRenderer.on('forWin2', function (event, arg){
 vm.configuracao =  arg; 
});