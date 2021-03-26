const YouTube = require('youtube-node');
const config = require('./yt-config');

const youtube = new YouTube();
youtube.setKey(config.key);


function searchVideoURL(message, queryText) {
    // encapsulando função de search em uma promise para conseguirmos retornar os resultados do callback
      return new Promise((resolve, _) => {
        // realizando a busca baseada na concatenação da sring e do queryText
          youtube.search(`Música de ${queryText}`, 2, function(error, result) {
              if (error) {
                // caso ocorra algum erro essa mensagem será retornada
                // lembrem-se que a melhor prática seria rejeitar essa promise nesse ponto
                resolve('Não foi possível encontrar um vídeo no momento, por favor tente mais tarde');
              } else { 
                // gerando um array de videoIds
                const videoIds = result.items.map((item) => item.id.videoId).filter(item => item);
  
                // gerando um array de links do youtube
                const youtubeLinks = videoIds.map(videoId => `https://www.youtube.com/watch?v=${videoId}`).join(', ');
  
                // retornando a mensagem inicial concatenadas com os links do youtube para o arquivo index.js
                resolve(`${message} ${youtubeLinks}`);
              }
            });
      });
  }

module.exports.searchVideoURL = searchVideoURL;
