import yts from 'yt-search'
import { youtubeSearch } from '@bochilteam/scraper-sosmed'
import { isUrl } from '../../lib/func.js'

let handler = async (m, { conn, text, args, usedPrefix, command }) => {
	if (!text) throw `Ejemplo: ${usedPrefix + command} Somewhere Only We Know`
	if (isUrl(text)) {
		try {
			let anu = await youtubeSearch(text)
			anu = anu.video[0]
			let txt = `📌 *${anu.title}*\n\n`
			+ `🪶 *Autor :* ${anu.authorName}\n`
			+ `⏲️ *Publicado :* ${anu.publishedTime}\n`
			+ `⌚ *Duracion :* ${anu.durationH}\n`
			+ `👁️ *Vistas :* ${anu.viewH}\n`
			+ `🌀 *Url :* ${anu.url}`
			await conn.sendMsg(m.chat, { image: { url: anu.thumbnail.split("?")[0] }, caption: txt }, { quoted: m })
		} catch (e) {
			console.log(e)
			try {
				let anu = await (await fetch(`https://api.akuari.my.id/downloader/yt1?link=${args[0]}`)).json()
				let txt = `📌 *${anu.info.title}*\n\n`
				+ `🪶 *Autor :* ${anu.info.channel}\n`
				+ `⏲️ *Publicado :* ${anu.info.uploadDate}\n`
				+ `👁️ *Vistas :* ${anu.info.views}\n`
				+ `🌀 *Url :* ${text}`
				await conn.sendMsg(m.chat, { image: { url: anu.info.thumbnail }, caption: txt }, { quoted: m })
			} catch (e) {
				console.log(e)
				throw 'URL no válida/error interno del servidor.'
			}
		}
	} else {
		try {
			let anu = await yts(text)
			let txt = `*Consulta : ${text}*`
			for (let i of anu.all) {
				txt += `\n\n🎯 *${i.title}*\n`
				+ `🪶 Autor : ${i.author.name}\n`
				+ `${(i.duration && i.duration.timestamp) ? `⏰ *Duración :* ${i.duration.timestamp}\n` : ''}`
				+ `🚀 Publicado : ${i.ago}\n`
				+ `😎 Vistas : ${i.views}\n`
				+ `🌀 Url : ${i.url}\n`
				+ `───────────────────`
			}
			await conn.sendMsg(m.chat, { image: { url: anu.all[0].thumbnail }, caption: txt }, { quoted : m })
		} catch (e) {
			console.log(e)
			try {
				let anu = await youtubeSearch(text)
				let txt = `*Consulta : ${text}*`
				for (let i of anu.video) {
					txt += `\n\n🎯 *${i.title}*\n`
					+ `🪶 Autor : ${i.authorName}\n`
					+ `⏰ Duracion : ${i.durationH}\n`
					+ `${i.publishedTime ? `${i.publishedTime.split(" ")[0] != 'Streamed' ? `🚀 Publicado ${i.publishedTime}\n` : `🚀 ${i.publishedTime}\n`}` : ''}`
					+ `😎 Vistas : ${i.viewH}\n`
					+ `🌀 Url : ${i.url}\n`
					+ `───────────────────`
				}
				await conn.sendMsg(m.chat, { image: { url: anu.video[0].thumbnail.split("?")[0] }, caption: txt }, { quoted : m })
			} catch (e) {
				console.log(e)
				throw 'no encontrado/error interno del servidor.'
			}
		}
	}
}

handler.menudownload = ['ytsearch <txt> / <url>']
handler.tagsdownload = ['search']
handler.command = /^((search)?yt(s(earch)?)|youtube)$/i

export default handler