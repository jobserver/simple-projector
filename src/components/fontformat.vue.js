const Fontformat = {
    template: 
        `
        <div>
        <v-row dense>
                <v-col cols="12" md="5" lg="5" xl="5">                  
                  <v-autocomplete dense v-model="$root.configuracao.fontFamily" :items="$root.painel.listFonts"
                      label="Fonte">
                      <template v-slot:item="data">
                        <span :style="[{'fontFamily':data.item} ]">{{data.item}}</span>
                      </template>
                    </v-autocomplete>
                </v-col>
                <v-col cols="12" md="2" lg="2" xl="2">
                  <v-text-field      
                    dense          
                    label="Tamanho"
                    v-model.number="$root.configuracao.fontSize"
                    type="number"
                    min="20"
                    max="200"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="2" lg="2" xl="2">
                  <v-text-field      
                    dense          
                    label="Letter Spacing"
                    v-model.number="$root.configuracao.letterSpacing"
                    type="number"                    
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="2" lg="2" xl="2">
                  <v-text-field      
                    dense          
                    label="Altura Linha"
                    v-model.number="$root.configuracao.lineHeight"
                    type="number"                    
                  ></v-text-field>
                </v-col>
              </v-row>
              <div>                                
                  <v-btn-toggle
                  v-model="$root.configuracao.textFormat"
                  color="primary"
                  dense
                  group
                  multiple
                >
                  <v-btn
                    :value="1"
                    text
                  >
                    <v-icon>mdi-format-bold</v-icon>
                  </v-btn>
          
                  <v-btn
                    :value="2"
                    text
                  >
                    <v-icon>mdi-format-italic</v-icon>
                  </v-btn>
          
                  <v-btn
                    :value="3"
                    text
                  >
                    <v-icon>mdi-format-underline</v-icon>
                  </v-btn>
                  
                  <v-btn
                    :value="4"
                    text
                  >
                    <v-icon>mdi-format-letter-case-upper</v-icon>
                  </v-btn>
          
                  
                </v-btn-toggle>

                <input type="color" v-model="$root.configuracao.color"></input>                
                <v-btn-toggle v-model="$root.configuracao.align" color="primary" dense group>
                  <v-btn value="left" text>
                    <v-icon>mdi-format-align-left</v-icon>
                  </v-btn>

                  <v-btn value="center" text>
                    <v-icon>mdi-format-align-center</v-icon>
                  </v-btn>

                  <v-btn value="right" text>
                    <v-icon>mdi-format-align-right</v-icon>
                  </v-btn>

                  <v-btn value="justify" text>
                    <v-icon>mdi-format-align-justify</v-icon>
                  </v-btn>
                </v-btn-toggle>
                <v-col cols="8" class="d-flex">

                  <input type="color" v-model="$root.configuracao.shadow[0].color"></input>
                  <v-text-field      
                  dense          
                  label="Tamanho"
                  v-model.number="$root.configuracao.shadow[0].size"
                  type="number"
                  min="0"
                  max="100"
                ></v-text-field>                  
                  <input type="color" v-model="$root.configuracao.shadow[1].color"></input>
                  <v-text-field      
                  dense          
                  label="Tamanho"
                  v-model.number="$root.configuracao.shadow[1].size"
                  type="number"
                  min="0"
                  max="100"
                ></v-text-field>     
                <v-btn outlined color="success" text @click="$root.configuracao.texto =''">Esconder texto</v-btn>             
                </v-col>
              </div>        
       </div>
        `
}