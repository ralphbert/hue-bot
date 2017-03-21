# hue-bot

This is a simple music artist search bot for Telegram.

## Installation

```npm install```

## Usage

Register yourself a bot @BotFather and copy the API key. 

Next, register yourself a last.fm app: https://www.last.fm/api/account/create and copy the API key.

Add both keys into a file called `token.js`:

```
module.exports = {
  botToken: 'TELEGRAM-TOLEN',
  lastfmToken: 'LAST-FM-TOKEN'
};
```

Then run the bot:

`node index.js`

## Bot commands

The bot can be used as inline bot like this: 

In any chat just write `@yourBotName bandName`. This will trigger an inline query.

On the other hand, you can chat with the bot directly. Use the command `/artist artistName` to fetch artist details.

## Further information

node-telegram-bot-api: 
https://github.com/yagop/node-telegram-bot-api

About Telegram bots:
https://core.telegram.org/bots

Bot API manual:
https://core.telegram.org/bots/api
