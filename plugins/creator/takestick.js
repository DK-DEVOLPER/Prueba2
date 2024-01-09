import { addExif } from '../../lib/sticker.js'

let handler = async (m, { conn, text, usedPrefix, command }) => {
	if (!m.quoted) throw `Responde a un sticker con el comando :\n*${usedPrefix + command} <packname>|<author>*`
	let stiker = false
	try {
		let [pack, aut] = text.split('|')
		pack = pack || '-'
		aut = aut || '-'
		let mime = m.quoted.mimetype || ''
		if (!/webp/.test(mime)) throw `Responde a un sticker con el comando :\n*${usedPrefix + command} <packname>|<author>*`
		let img = await m.quoted.download()
		if (!img) throw `Responde a un sticker con el comando :\n*${usedPrefix + command} <packname>|<author>*`
		stiker = await addExif(img, pack, aut)
	} catch (e) {
		console.error(e)
		if (Buffer.isBuffer(e)) stiker = e
	} finally {
		if (stiker) conn.sendFile(m.chat, stiker, '', '', m, false, { asSticker: true })
		else throw 'La conversión falló'
	}
}

handler.help = ['wm <packname>|<author>']
handler.tags = ['creator']
handler.command = /^(((stic?ker)?wm(stic?ker)?)|(takestic?k(er)?)|colong)$/i

handler.premium = true
handler.limit = true

export default handler
