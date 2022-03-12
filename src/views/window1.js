const ipcRenderer = require("electron").ipcRenderer;
const path = require("path");
const fontList = require('font-list');

let painel = require('../data/dataPainel');
let configuracao = require('../data/dataConfig');

Vue.component('Background',Background);
Vue.component('Fontformat',Fontformat);
Vue.component('Playlist',Playlist);
Vue.component('Biblia',Biblia);
Vue.component('Musica',Musica);

var vm = new Vue({
  el: "#app",
  data() {
    return {
      biblia:null,                      
      painel,
      configuracao,
    };
  },
  watch: {
    "painel.musicaAtiva"(newVal) {
      this.$refs.musicas.selectMusica(newVal);
    },
    "painel.bibliaVersao"(newVal) {      
      this.$refs.biblia.selectBiblia();
    },
    configuracao: {
      handler(val){        
        this.atualizarProjecao();
      },
      deep: true
    },
  },
  created() {              
    this.getListFonts();
    this.atualizarProjecao();
    // this.getMonitores()
  },
  methods: {
    getListFonts:function(){
      fontList.getFonts({ disableQuoting: true })
      .then(fonts => {
        this.painel.listFonts = fonts;        
      })
      .catch(err => {
        console.log(err)
      })
    },
    atualizarProjecao: function () {
      ipcRenderer.send("nameMsg", this.configuracao);
    },
    
    // getMonitores:function(){
    //   ipcRenderer.send("getMonitores", true);
    // }
  },
  vuetify: new Vuetify({
    theme: { dark: true },
  }),
});

// ButtonNewWindow = document.getElementById("loadnewwindow");
// ButtonNewWindow.addEventListener("click", (event) => {
//   ipcRenderer.send("abrirProjetor", true);
// });

ipcRenderer.on("nameReply", (event, arg) => {
  // console.log(arg) // why/what is not right..
});
