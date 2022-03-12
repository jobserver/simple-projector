module.exports = {
  // Responsavel por aplicar codificação correta no arquivo,
  // e identificar corretamente as quebras de linha
    parseToList(texto,arquivo){
        var padrao = new RegExp(/(\n\r)/gu);
  
        var codificacao = getFileEncoding("src/arquivos/musicas/" + arquivo);
  
        if ( ["utf8"].includes(codificacao) || ( codificacao=="ascii" && !padrao.test(texto) ) ) {
          // console.log("vai conterver");
          var iconv = require("iconv-lite");
          texto = iconv.encode(texto, "ISO-8859-1").toString();        
        }
  
        return (padrao.test(texto))? texto.split(/(\n\r)/gu) : texto.split(/(\n){2}/gu);
      }
}