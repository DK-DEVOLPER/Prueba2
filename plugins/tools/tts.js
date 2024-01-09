import gtts from 'node-gtts'
import { readFileSync, unlinkSync } from 'fs'
import { join } from 'path'

const defaultLang = 'es'
let handler = async (m, { conn, args, usedPrefix, command }) => {
	if (!args[0]) throw `Ej : *${usedPrefix +command} hola mundo!*`
	let lang = args[0]
	let text = args.slice(1).join(' ')
	if ((args[0] || '').length !== 2) {
		lang = defaultLang
		text = args.join(' ')
	}
	if (!text && m.quoted?.text) text = m.quoted.text
	let res
	try { res = await tts(text, lang) }
	catch (e) {
		console.log(e)
		text = args.join(' ')
		if (!text) throw `Ejemplo de uso ${usedPrefix}${command} es hola mundo`
		res = await tts(text, defaultLang)
	} finally {
		if (res) await conn.sendFile(m.chat, res, '', '', m, true)
	}
}

handler.help = ['tts <idioma> <txt>']
handler.tags = ['tools']
handler.command = /^(g?tts)$/i

export default handler

function tts(text, lang = 'es') {
	console.log(lang, text)
	return new Promise((resolve, reject) => {
		try {
			let tts = gtts(lang)
			let filePath = join(global.__dirname(import.meta.url), '../../tmp', (1 * new Date) + '.wav')
			try {
				tts.save(filePath, text, () => {
					resolve(readFileSync(filePath))
					unlinkSync(filePath)
				})
			} catch (e) {
				tts.save(filePath, 'error', () => {
					resolve(readFileSync(filePath))
					unlinkSync(filePath)
				})
			}
		} catch (e) { reject(e) }
	})
}