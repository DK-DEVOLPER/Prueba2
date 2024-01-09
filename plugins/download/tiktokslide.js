import { delay,ranNumb } from '../../lib/func.js'

let handler = async(m, { conn, text, usedPrefix, command, isPrems }) => {
	if (!text) throw `Ejemplo: ${usedPrefix + command} https://vt.tiktok.com/ZS81qJD5v/`
	if (!(text.includes('http://') || text.includes('https://'))) return m.reply(`URL no válida, ingrese una URL válida. Pruebe agregando http:// o https://`)
	if (!text.includes('tiktok.com')) return m.reply(`URL de Tiktok no válida.`)
	try {
		let res = await fetch(`https://api.lolhuman.xyz/api/tiktokslide?apikey=${api.lol}&url=${text}`)
		let anu = await res.json()
		if (anu.status != '200') throw Error(anu.message)
		anu = anu.result
		if (anu.length == 0) throw Error('Error : no data')
		let c = 0, d = anu.length
		if (!isPrems && anu.length > 7) {
			anu = anu.slice(0, 7)
			await conn.reply(m.sender, `_[!] (no usuarios premium)_ límite máximo de 6 imagenes.`, m)
		}
		for (let x of anu) {
			if (c == 0) await conn.sendMsg(m.chat, { image: { url: x }, caption: `Enviando 1 de ${anu.length} imagenes.\n_(las demas se enviaran al chat privado.)_` }, { quoted : m })
			else await conn.sendMsg(m.sender, { image: { url: x } })
			c += 1
			await delay(isPrems ? ranNumb(700, 1000) : ranNumb(800, 1500))
		}
	} catch (e) {
		console.log(e)
		throw `URL de tiktok no válida/medios no disponibles.`
	}
}

handler.menudownload = ['tiktokslide <url>']
handler.tagsdownload = ['search']
handler.command = /^((tt|tiktok)slide)$/i

handler.premium = true
handler.limit = true

export default handler