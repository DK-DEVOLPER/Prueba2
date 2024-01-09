import { styletext } from '../../lib/scrape.js'

let handler = async (m, { conn, text, usedPrefix, command }) => {
	let teks = text ? text : m.quoted?.text ? m.quoted.text : ''
	if (!teks) throw `Ej: *${usedPrefix + command} su nombre*`
	let anu = await styletext(teks)
	let txt = ''
	for (let x of anu) {
		txt += `*${x.name}*\n${x.result}\n\n`
	}
	await m.reply(txt)
}

handler.help = ['style'].map(v => v + ' <txt>')
handler.tags = ['tools']
handler.command = /^(style(text)?)$/i

export default handler