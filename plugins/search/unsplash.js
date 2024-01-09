import { delay, ranNumb } from '../../lib/func.js'

let handler = async(m, { conn, text, usedPrefix, command, isPrems }) => {
	if (!text) return m.reply(`*Uso : ${usedPrefix + command} consulta*\n\nEj :\n${usedPrefix + command} montañas`)
	try {
		let anu = await (await fetch(`https://api.lolhuman.xyz/api/unsplash?apikey=${api.lol}&query=${text}`)).json()
		if (anu.status != 200) return m.reply(anu.message)
		let c = 0, d = anu.result
		if (!isPrems && d.length > 7) {
			d = d.slice(0, 7)
			await conn.reply(m.sender, `_[!] (no es un usuario premium)_ Límite máximo de 6 imagenes.`, m)
		}
		for (let x of d) {
			if (c == 0) await conn.sendMsg(m.chat, { image: { url: x }, caption: `Enviando 1 de ${d.length} imagenes.\n_(El resto se enviará vía chat privado..)_` }, { quoted : m })
			else await conn.sendMsg(m.sender, { image: { url: x } })
			c += 1
			await delay(isPrems ? ranNumb(700, 1000) : ranNumb(800, 1500))
		}
	} catch (e) {
		console.log(e)
		throw 'Internal server error'
	}
}

handler.menudownload = ['unsplash <txt>']
handler.tagsdownload = ['search']
handler.command = /^(unsplash(dl|download)?)$/i

handler.premium = true
handler.limit = true

export default handler