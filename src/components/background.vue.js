const fs = require("fs");

const Background = {
    template: `
    <div>
    <v-row dense>    
                <v-col dense class="d-flex justify-space-between align-center">
                <v-btn outlined color="success" text @click="carregarListaBackgrounds()">Atualizar lista</v-btn>
                <v-btn outlined color="success" text @click="esconderImagem()">Esconder</v-btn>              
                Cor fundo:
                <input type="color" v-model="backGroundColor"></input>   
                <v-col dense cols="3">

                  <v-select
                  dense
                  :items="['auto','contain','cover']"
                  v-model="backgroundSize"
                  label="Tamanho"
                  ></v-select>        
                </v-col>   
                </v-col>
              </v-row>

   
   <!-- imagem -->
           <div style="overflow: hidden;overflow-y: auto; height: 320px;">
            <v-row >
              <v-col
                v-for="(imagem,n) in listaBackgrounds"
                :key="n"
                class="d-flex child-flex"
                cols="2"
              >
                <v-img
                  :src="loadImage(imagem)"                  
                  aspect-ratio="1"
                  class="grey lighten-2"
                   @click="setImagem(imagem)"
                >
                  <template v-slot:placeholder>
                    <v-row
                      class="fill-height ma-0"
                      align="center"
                      justify="center"
                    >
                      <v-progress-circular
                        indeterminate
                        color="grey lighten-5"
                      ></v-progress-circular>
                    </v-row>
                  </template>
                </v-img>
              </v-col>
            </v-row>
          </div>
           <!-- fim list imagem -->
</div>
    `
    ,
    mounted(){
        this.carregarListaBackgrounds();
       
    },
    computed:{
        backgroundSize:{
            get: function(){
                return this.$root.configuracao.backgroundSize;
                },
            set: function(newValue){
                this.$set(
                    this.$root.configuracao,
                    "backgroundSize",
                    newValue
                    );
                }
            },
        backGroundColor:{
            get: function(){
                return this.$root.configuracao.backGroundColor;
                },
            set: function(newValue){
                this.$set(
                    this.$root.configuracao,
                    "backGroundColor",
                    newValue
                    );
                }
            },
        listaBackgrounds() {
                    return this.$root.painel.listaBackgrounds;
            }
        },
    methods: { 
        loadImage(imagem){
            return `../arquivos/fundos/${imagem}`;
        },
         setImagem(imagem){               
             const img = `../arquivos/fundos/${imagem}` ;       

            this.$set(
                this.$root.configuracao,
                "backgroundImage",
                img
            );            
         },
        esconderImagem(){                        
            this.$set(
                this.$root.configuracao,
                "backgroundImage",
                ''
            );            
            },
        carregarListaBackgrounds: function () {                
            const lista = fs.readdirSync(`src/arquivos/fundos/`);
     
            this.$set(
                this.$root.painel,
                "listaBackgrounds",
                lista
            );            
            }
    }
    
}