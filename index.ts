const Telegraf = require('telegraf')

const bot = new Telegraf('913354997:AAEoTXmJJXr7hyykD3-bHjvITJt4ynGHEVc')
bot.command('add', (ctx:any) => {console.log(ctx);ctx.reply('Hello')})
bot.launch()
