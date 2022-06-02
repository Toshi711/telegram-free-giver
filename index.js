import fs from 'fs'
import {Telegraf} from 'telegraf'
import {Keyboard} from 'telegram-keyboard'
import read from './database/read.js'
import write from './database/write.js'

function getAccount(file){

    const data = fs.readFileSync(file).toString().trim().split('\n')
    const acc = data.splice(0,1)
    fs.writeFileSync(file, data.join('\n'))

    return acc.join('').replace(/\r/, '')
}

const bot = new Telegraf('5143243912:AAHxxR6Ak4HHVzpKsKAFra6xXWxDxk4VWWo')


bot.command('start', ctx => {
    
    const kb = Keyboard.make(['Получить аккаунт']).reply()
    
    ctx.reply('Yep', kb)
})

bot.hears('Получить аккаунт', async ctx => {

    const res = await read(ctx.from.id)

    console.log(res.length)

    if(res.length == 0){

        await ctx.reply(getAccount('accounts.txt'))
        return write(ctx.from.id)
    }

    return ctx.reply('Вам уже был выдан аккаунт')
})


bot.launch()