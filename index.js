const TelegramBot = require('node-telegram-bot-api');
const axios = require('axios');
const ResponseParser = require('./lib/responseParser');

// TODO add you telegram API token into the token.js file
const tokens = require('./tokens');
const token = tokens.botToken;
const lastfmToken = tokens.lastfmToken;

// creating new bot instance, polling the Telegram API
const bot = new TelegramBot(token, {polling: true});

bot.onText(/\/artist (.+)/, (msg, match) => {
  const chatId = msg.chat.id;
  const query = match[1];
  const url = `http://ws.audioscrobbler.com/2.0/?method=artist.search&artist=${query}&api_key=${lastfmToken}&format=json`;
  bot.sendMessage(chatId, `Searching for ${query}...\n${url}`);

  axios.get(url).then((response) => {
    let parser = new ResponseParser(response.data);
    const artist = parser.getFirstArtist();

    if (artist) {
      const band = parser.getFirstArtist();
      console.log(band);
      bot.sendMessage(chatId, `${band.name} ${band.thumbnail}`);
    } else {
      bot.sendMessage(chatId, `No artist found with the name ${query}`);
    }
  }).catch(function (error) {
    bot.sendMessage(chatId, error.message);
  });
});

bot.on('inline_query', function (msg) {
  const url = `http://ws.audioscrobbler.com/2.0/?method=artist.search&artist=${msg.query}&api_key=${lastfmToken}&format=json`;
  console.log(msg);

  axios.get(url).then((response) => {
    let parser = new ResponseParser(response.data);
    const inlineQuery = parser.getArtistInlineQuery();
    console.log('inline', inlineQuery);
    bot.answerInlineQuery(msg.id, inlineQuery).then(() => {
      console.log(arguments)
    });
  });
});