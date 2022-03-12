const knex = require("knex");

const Biblia = {
    template: `
    <div>
    <v-row dense>
                <v-col cols="6" dense>
                  <v-text-field dense v-model="$root.painel.bibliaFilter.text" label="Pesquisar frase"
                    @keyup.enter="getVersiculos()"></v-text-field>
                </v-col>
                <v-col cols="6" dense>
                  <v-autocomplete dense v-model="$root.painel.bibliaVersao" item-value="key"
                    item-text="name" :items="$root.painel.bibliaVersoesList"></v-autocomplete>
                </v-col>
                <v-col cols="6">
                  <v-autocomplete dense v-model="$root.painel.bibliaFilter.book_id" item-value="book_reference_id"
                    item-text="name" :items="$root.painel.livros"></v-autocomplete>
                </v-col>
                <v-col cols="3">
                  <v-text-field type="number" dense v-model.number="$root.painel.bibliaFilter.chapter" min="1"
                    label="Capítulo" @keyup.enter="getVersiculos()">
                  </v-text-field>
                </v-col>
                <v-col cols="3">
                  <v-text-field type="number" dense v-model.number="$root.painel.bibliaFilter.verse" min="1" label="Versiculo"
                    @keyup.enter="getVersiculos()">
                  </v-text-field>
                </v-col>
              </v-row>

               <v-list dense>
                <v-list-item-group color="primary" style="overflow: hidden;overflow-y: auto; height: 350px;">
                  <v-list-item v-for="(item, i) in $root.painel.biblia.versiculos" :key="i" @click="selectVersiculo(item)">
                    <v-list-item-icon>
                      {{item.verse}}
                    </v-list-item-icon>
                    <v-list-item-content>
                      <v-list-item-title v-text="item.text"></v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </v-list-item-group>
              </v-list>
    </div>
    `,
   async created() {
        this.$root.painel.bibliaVersao = this.$root.painel.bibliaVersoesList[0].key;
        // console.log(path.join(__dirname + "/arquivos/biblias/"));
        await this.selectBiblia();
        await this.getLivros();
    },
    methods:{
        selectBiblia:function(){               
            this.$root.biblia =  knex({
                client: "sqlite3",
                connection: {
                // filename: path.join(__dirname + "/arquivos/biblias/", "ARA.sqlite"),
                filename: 'src/arquivos/biblias/'+ this.$root.painel.bibliaVersao,
                },
                useNullAsDefault: true
            });
            
            this.getVersiculos();      
        }, 
        getVersiculos: async function () {
            let condicoes = { ...this.$root.painel.bibliaFilter };      
            let result = "";            
            if (condicoes.text != "") {
                result = await this.$root.biblia
                .select("*")
                .from("verse")
                .where("text", "like", "%" + condicoes.text + "%")
                .limit(100);
            } else if(condicoes?.book_id  &&  condicoes?.chapter) {
                this.$root.$delete(condicoes, "text");                
                if (condicoes.verse == "undefined" || condicoes.verse == "") {                
                this.$root.$delete(condicoes, "verse");
                }
                result = await this.$root.biblia.select("*").from("verse").where(condicoes);
            }else{
                return [];
            }

            try {                
                this.$set(this.$root.painel.biblia,'versiculos' ,result) ;
                //caso seja listado um único versículo já aparece direto na tela               
                if(result.length==1 && condicoes.verse !="") 
                this.selectVersiculo(result[0]);            
            }
            catch(e){

            }
        },
        getLivros: async function () {
            result = await this.$root.biblia.select("*").from("book");
           
            try{
                this.$set(this.$root.painel,'livros',result);
            }
            catch(e){
                console.log(`Error: ${e}`);
            }
            
        },
        selectVersiculo: function (item) {
            const texto = `${item.text} <br><br> (${this.$root.painel.bibliaVersao.split('.')[0]}, ${
                this.$root.painel.livros[item.book_id-1].name
            } ${item.chapter}:${item.verse})`;

            this.$set( this.$root.configuracao, 'texto', texto );

            this.$root.atualizarProjecao();
        },
    }
}