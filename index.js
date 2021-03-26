const TelegramBot = require('node-telegram-bot-api');
const dialogflow = require('./dialogflow')
const youtube = require('./youtube');

const token = 'TOKEN_GOOGLE_API_DIALOGFLOW';

const bot = new TelegramBot(token,{polling:true},1000);

bot.on("message", async(msg)=>{
    const chatId = msg.chat.id;
    console.log(msg.text);

    const dfResponse = await dialogflow.sendMessage(chatId.toString(),msg.text);
    bot.sendMessage(chatId, dfResponse.text);

    let responseText = dfResponse.text;

    if (dfResponse.intent === 'Músicas') {
        // modifica o texto para os dados retornados a partir da busca realizada no youtube
        // lembre-se que para acessar o campo corpo dentro de fields ele teve que ser definido como uma entidade no dialogflow
        textResponse = await youtube.searchVideoURL(responseText, dfResponse.fields.corpo.stringValue);
    }
    bot.sendMessage(chatId,responseText);
});