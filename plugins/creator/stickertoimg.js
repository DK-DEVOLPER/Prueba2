import { spawn } from 'child_process'
import { format } from 'util'

let handler = async (m, { conn, command, usedPrefix }) => {
	let q = m.quoted
	if (q && /sticker/.test(q.mtype)) {
		if (q.isAnimated) return m.reply(`para ese tipo de sticker escribe *${usedPrefix}tomp4* y marca al sticker`)
		let img = await m.quoted.download()
		try {
			let bufs = []
			const [_spawnprocess, ..._spawnargs] = [...(global.support.gm ? ['gm'] : global.support.magick ? ['magick'] : []), 'convert', 'webp:-', 'png:-']
			let im = spawn(_spawnprocess, _spawnargs)
			im.on('error', e => m.reply(format(e)))
			im.stdout.on('data', chunk => bufs.push(chunk))
			im.stdin.write(img)
			im.stdin.end()
			im.on('exit', async () => {
				await conn.sendFile(m.chat, Buffer.concat(bufs), 'image.png', '*LISTO*', m)
			})
		} catch (e) {
			console.log(e)
			await conn.sendMsg(m.chat, { image: img, jpegThumbnail: img, caption: '*LISTO*' }, { quoted: m })
		}
	} else return m.reply('Responde / marca un Sticker')
}

handler.help = ['toimg']
handler.tags = ['tools']
handler.command = /^(toim(g|age))$/i

export default handler