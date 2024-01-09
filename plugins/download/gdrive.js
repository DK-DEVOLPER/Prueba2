import { someincludes } from '../../lib/func.js'
import { GDriveDl } from '../../lib/scrape.js'

let handler = async (m, { conn, args }) => {
	if (!(args[0] || '').match(/([\w-]){33}|([\w-]){19}/)) throw '[!] Introduzca el link de GoogleDrive'
	try {
		let anu = await GDriveDl(args[0])
		if (anu.fileSize.slice(-2) == "GB") return m.reply(`No te preocupes.\n¿Dónde puedo enviar este tamaño? ${anu.fileSize}`)
		if (!someincludes(['kB','KB'], anu.fileSize.slice(-2)) && parseInt(anu.fileSize) > 300) return m.reply(`Tamaño: ${anu.fileSize}\nNo se puede enviar, archivo máximo 300 MB`)
		let txt = `_*Descargando archivo, no hagas spam . . .*_\n\n`
		txt += `*Nombre :* ${anu.fileName}\n`
		txt += `*Tamaño :* ${anu.fileSize}\n`
		txt += `*Tipo de Archivo :* ${anu.mimetype}`
		await m.reply(txt)
		await conn.sendMsg(m.chat, { document: { url: anu.downloadUrl }, fileName: anu.fileName, mimetype: anu.mimetype }, { quoted: m })
	} catch (e) {
		console.log(e)
		throw 'El bot no tiene acceso a este GoogleDrive'
	}
}

handler.menudownload = ['gdrive <link>']
handler.tagsdownload = ['search']
handler.command = /^(g?(oogle)?drive)$/i

handler.premium = true
handler.limit = true

export default handler