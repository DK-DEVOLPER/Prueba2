import fetch from 'node-fetch'

let handler = async (m, { conn, usedPrefix, command, text}) => {
    if (!text) throw `Y el link?\nEjemplo: *${usedPrefix}${command} https://web.facebook.com/watch/?v=892725951575913*`
    m.reply(wait)
    try {
        let anu = await (await fetch(`https://api.lolhuman.xyz/api/facebook?apikey=${api.lol}&url=${text}`)).json()

        for (let i of anu.result) {
            await conn.sendMsg(m.chat, { video: {url: i } }, {quoted: m})
        }
    } catch (e) {
        m.reply('link invalido / Servidor caído')
    }
    
}

handler.tagsdownload = ['search']
handler.menudownload = ['Facebook <link>']
handler.command = /^(facebook|fbdl|fb|facebookdl)$/i

handler.limit = true

export default handler