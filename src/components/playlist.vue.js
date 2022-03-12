const Playlist = {
    template:
    `
    <div>
        <v-row dense>
                <v-col cols="12" dense class="d-flex justify-space-between">   
                  <v-btn color="success" small outlined @click="salvarPlayList()">
                    <v-icon>mdi-harddisk</v-icon>
                    Salvar PLaylist
                  </v-btn>           
                  <v-btn  small color="primary" outlined @click="loadPlayList()">
                    <v-icon>mdi-folder-search-outline</v-icon>
                    Carregar PLaylist
                  </v-btn>           
                  <v-btn color="red" small outlined @click="limparPlayList()">
                    <v-icon>mdi-trash-can-outline</v-icon>
                    Limpar PLaylist
                  </v-btn>           
                  </v-col>
                </v-row>

                    <v-row dense>
                      <v-col cols="12" dense>

                        <v-list dense>
                          <v-list-item-group color="primary" style="overflow: hidden;overflow-y: auto; height: 310px;">
                            <v-list-item v-for="(item, i) in $root.painel.playList" :key="i" @click="$root.painel.musicaAtiva=item;">
                              <v-list-item-content>
                                {{item}}
                              </v-list-item-content>
                            </v-list-item>
                          </v-list-item-group>
                        </v-list>                                                                  
                </v-col>
              </v-row>
    </div>
    `,

    methods:{
        salvarPlayList: function () {
            fs.writeFile(
                "src/data/configPainel.json",
                JSON.stringify(this.$root.painel.playList),
                function (err) {
                if (err) {
                    return console.log("error");
                }
                console.log("arquivo criado");          
                }
            );
        },
        loadPlayList: function () {
            var texto = fs.readFileSync("src/data/configPainel.json",'utf8');
       
            this.$root.painel.playList = JSON.parse(texto);
        },
        limparPlayList: function () {       
            this.$root.painel.playList = [];
        },

    }

}