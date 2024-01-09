import googleIt from 'google-it'

let handler = async (m, { conn, command, text, usedPrefix }) => {
	if (!text) throw `Ej : ${usedPrefix + command} Goku`
	let anu = await googleIt({'query': text})
	if (anu.length == 0) throw 'No encontré nada.'
	let txt = `Consulta : ${text}`
	for (var x of anu) {
		txt += `\n\n*${x.title}*\n`
		txt += `${x.link}\n`
		txt += `_${x.snippet}_\n`
		txt += `───────────────────`
	}
	await m.reply(txt)
}

handler.help = ['google'].map(v => v + ' <txt>')
handler.tags = ['searching']
handler.command = /^(googlef?)$/i

export default handler