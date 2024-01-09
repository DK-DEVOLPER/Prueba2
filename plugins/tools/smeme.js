import uploadImage from '../../lib/uploadImage.js'
import fs from 'fs'
import { Sticker, StickerTypes } from 'wa-sticker-formatter'

let handler = async (m, { conn, text, usedPrefix, command }) => {
	let q = m.quoted ? m.quoted : m
	let mime = (q.msg || q).mimetype || q.mediaType || ''
	if (!/image\/(jpe?g|png|webp)/.test(mime)) throw `Uso : ${usedPrefix + command} txt1|txt2\n\nEj: *${usedPrefix + command} Shiro|Neko*`
	if (!text) throw `Uso : ${usedPrefix + command} txt1|txt2\n\nEj: *${usedPrefix + command} Shiro|Neko*`
	let [l, r] = text.split`|`
	if (!l) l = '-'
	if (!r) r = '-'
	let ztick = fs.readFileSync(`./media/sticker/bronya.webp`)
	let img = await q.download?.()
	let out = await uploadImage(img)
	try {
		let res = `https://api.memegen.link/images/custom/${encodeURIComponent(l)}/${encodeURIComponent(r)}.png?background=${out}`
		let sticker = new Sticker(res, { pack: packname, author: author, type: StickerTypes.FULL })
		ztick = await sticker.toBuffer()
		await conn.sendFile(m.chat, ztick, '', '', m)
	} catch (e) {
		console.log(e)
		await conn.sendFile(m.chat, ztick, '', '', m)
	}
}

handler.help = ['smeme <txt1>|<txt2>']
handler.tags = ['tools']
handler.command = /^(s(tic?ker)?meme)$/i

export default handler