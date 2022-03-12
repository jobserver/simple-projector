const {getFileEncoding} = require('../helpers/getFileEncoding');
const {parseToList} = require('../helpers/parseToList')
const axios =require("axios");
var utf8 = require('utf8');

const Musica = {
    template: 
    `
    <div>
    <v-row>
                <v-col cols="12" md="8" lg="8" xl="8">
                  <v-autocomplete dense v-model="$root.painel.musicaAtiva" clearable :items="$root.painel.listaMusicas"
                    label="Base de dados de Músicas">
                  </v-autocomplete>
                </v-col>
                <v-col cols="12" md="4" lg="4" xl="4">
                  <v-btn-toggle color="primary" dense group>
                    <v-btn @click="modalMusica=1;" text>
                      <v-icon>mdi-plus</v-icon>
                    </v-btn>

                    <v-btn text :disabled="!$root.painel.musicaAtiva" @click="editarMusica($root.painel.musicaAtiva)">
                      <v-icon>mdi-pencil</v-icon>
                    </v-btn>

                    <v-btn text>
                      <v-icon>mdi-trash-can-outline</v-icon>
                    </v-btn>                    
                    <v-btn :disabled="!$root.painel.musicaAtiva" outlined color="primary" text @click="addPlayList()">
                      Add Playlist<!-- <v-icon>mdi-save</v-icon> -->
                    </v-btn>

                  </v-btn-toggle>
                </v-col>
              </v-row>

              <v-list dense>
                <v-list-item-group color="primary" style="overflow: hidden;overflow-y: auto; height: 400px;">
                  <v-list-item v-for="(item, i) in $root.painel.prevMusica" :key="i" @click="selectMusicaFrase(item)">
                    <v-list-item-content v-html="item">
                      
                    </v-list-item-content>
                  </v-list-item>
                </v-list-item-group>
              </v-list>


              <v-dialog v-model="modalEditarMusica" persistent max-width="800px" >
          <v-card class="" rounded="true" :loading="loading" min-height="600">
            <v-card-title class="font-weight-thin">Editar Música<v-spacer></v-spacer>
              <v-btn @click="modalEditarMusica=0;" small icon outlined color="primary" dark>
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-card-title>
            <v-card-text>
              <v-row>            
                <v-col cols="12">    
                  <v-text-field dense v-model="selecFiltroNewMusic.title" label="Título"></v-text-field>            
                  <v-textarea          
          label="Música"
          v-model="selecFiltroNewMusic.text"     
          rows="20"     
        ></v-textarea>
        <v-btn @click="salvarMusica" color="success">Salvar Música</v-btn>
                </v-col>                
              </v-row>
            </v-card-text>
          </v-card>
        </v-dialog>


        <v-dialog v-model="modalMusica" persistent max-width="1200px">
          <v-card class="" rounded="true" :loading="loading" min-height="600">
            <v-card-title class="font-weight-thin">Adicionar Música<v-spacer></v-spacer>
              <v-btn @click="modalMusica=0;" small icon outlined color="primary" dark>
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-card-title>
            <v-card-text>
              <v-row>
                <v-col cols="12" md="6" lg="6" xl="6">
                  
                  <v-text-field dense v-model="filterNewMusica" label="Pesquisar Música"
                  @keyup.enter="getFilterNewMusica()"></v-text-field>

                  <v-list dense>
                    <v-list-item-group color="primary" style="overflow: hidden;overflow-y: auto; height: 400px;">
                      <v-list-item v-for="(item, i) in resultadoFiltroNewMusic" :key="i" @click="getSelectNewMusica(item)">
                        <v-list-item-content>
                          {{item.title}}
                        </v-list-item-content>
                      </v-list-item>
                    </v-list-item-group>
                  </v-list>

                </v-col>
                <v-col cols="12" md="6" lg="6" xl="6">    
                  <v-text-field dense v-model="selecFiltroNewMusic.title" label="Título"></v-text-field>            
                  <v-textarea          
          label="Música"
          v-model="selecFiltroNewMusic.text"     
          rows="20"     
        ></v-textarea>
        <v-btn @click="salvarMusica" color="success">Salvar Música</v-btn>
                </v-col>                
              </v-row>
            </v-card-text>
          </v-card>
        </v-dialog>

    </div>
    `,
    data(){
        return {
            loading:false,  
            servidor:'https://proclamandocristo.com.br/vagalume.php',
            modalEditarMusica:0,
            selecFiltroNewMusic:{},
            resultadoFiltroNewMusic:[],
            modalMusica:0,      
            filterNewMusica:'',
        }
    },
    created(){
        this.carregarListaMusica();  
    },
    methods:{
        addPlayList:function(){
          let lista = this.$root.painel.playList ;
          lista.push(this.$root.painel.musicaAtiva);
          
            this.$set(this.$root.painel, 'playList', lista);
            console.log(this.$root.painel.playList);
          },
        selectMusicaFrase: function (text) {
            this.$set(this.$root.configuracao,'texto', text);
            this.$root.atualizarProjecao();
          },
        getFilterNewMusica:function(){
            axios.post(this.servidor,{q:this.filterNewMusica}).then(result=>{
              this.resultadoFiltroNewMusic = result.data.response.docs;
            });
      
          },
          getSelectNewMusica:function(item){
            axios.post(this.servidor,{url:item.url}).then(result=>{
              this.selecFiltroNewMusic = {text:result.data,title:item.band+' - '+item.title};
            });
          },
        editarMusica:function(item){
            this.modalEditarMusica = 1;
            var texto = this.selectMusica(item,true);
            if(texto){        
              this.$set(this.selecFiltroNewMusic,'title',item);
              this.$set(this.selecFiltroNewMusic,'text',texto);
            } 
            // this.selecFiltroNewMusic = item;
          }
      ,  
      salvarMusica: function () {
        let j = this;
        fs.writeFile(
          "src/arquivos/musicas/"+this.selecFiltroNewMusic.title,
          this.selecFiltroNewMusic.text,
          function (err) {
            if (err) {
              return console.log("error");
            }
            console.log("arquivo criado");
            j.carregarListaMusica();
            j.selectMusica(j.selecFiltroNewMusic.title);
          }
        );
      },
      carregarListaMusica: function () {
        this.$set(
          this.$root.painel,
          "listaMusicas",
          fs.readdirSync("src/arquivos/musicas")
        );
        //  this.painel.listaMusicas = fs.readdirSync('src/arquivos/musicas') ;
      },

      
      selectMusica: function (arquivo,retorno=false) {
        
        if(!arquivo){
          this.$set(this.$root.painel,'prevMusica', []) ;
          return false;
        }

        let texto = fs.readFileSync("src/arquivos/musicas/" + arquivo, {
          encoding: "utf8",
        });

        let lista = parseToList(texto,arquivo);
  
         let nova = [];

          lista.forEach(element => {
            let tamanho = element.replace(/\s+/g,'');          
            if(tamanho.length>0){
              nova.push(element.replace(/\n/g,'<br>'));
            }
          });
          
          if(retorno) return texto;
  
          this.$set(this.$root.painel,'prevMusica', nova) ;
      },
    }
}