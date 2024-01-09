import ytdl from 'ytdl-core'
import yts from 'yt-search'
import { youtubeSearch, youtubedl } from '@bochilteam/scraper-sosmed'
import { somematch, isUrl, niceBytes } from '../../lib/func.js'

let handler = async (m, { conn, text, args, usedPrefix, command }) => {
	if (!text) throw `Example: ${usedPrefix + command} Sia Unstopable`
	let url = ''
	if (isUrl(text)) {
		url = text
		try {
			let anu = await yts( { videoId: await ytdl.getURLVideoID(url) } )
			let txt = `📌 *${anu.title}*\n\n`
			+ `🪶 *Autor :* ${anu.author.name}\n`
			+ `⏲️ *Publicado :* ${anu.ago}\n`
			+ `⌚ *Duracion :* ${anu.duration.timestamp}\n`
			+ `👁️ *Vistas :* ${anu.views}\n`
			+ `🌀 *Url :* ${url}`
			await conn.sendMsg(m.chat, { image: { url: anu.thumbnail }, caption: txt }, { quoted: m })
		} catch (e) {
			console.log(e)
			try {
				let anu = await youtubeSearch(url)
				anu = anu.video[0]
				let txt = `📌 *${anu.title}*\n\n`
				+ `🪶 *Autor :* ${anu.authorName}\n`
				+ `⏲️ *Publicado :* ${anu.publishedTime}\n`
				+ `⌚ *Duración :* ${anu.durationH}\n`
				+ `👁️ *Vistas :* ${anu.viewH}\n`
				+ `🌀 *Url :* ${anu.url}`
				await conn.sendMsg(m.chat, { image: { url: anu.thumbnail.split("?")[0] }, caption: txt }, { quoted: m })
			} catch (e) {
				console.log(e)
				return m.reply('invalid url')
			}
		}
	} else {
		try {
			let anu = await yts(text)
			anu = anu.all[0]
			url = anu.url
			let txt = `📌 *${anu.title}*\n\n`
			+ `🪶 *Autor :* ${anu.author.name}\n`
			+ `⏲️ *Publicado :* ${anu.ago}\n`
			+ `${(anu.duration && anu.duration.timestamp) ? `⌚ *Duration :* ${anu.duration.timestamp}\n` : ''}`
			+ `👁️ *Vistas :* ${anu.views}\n`
			+ `🌀 *Url :* ${url}`
			await conn.sendMsg(m.chat, { image: { url: anu.thumbnail }, caption: txt }, { quoted: m })
		} catch (e) {
			console.log(e)
			try {
				let anu = await youtubeSearch(text)
				anu = anu.video[0]
				url = anu.url
				let txt = `📌 *${anu.title}*\n\n`
				+ `🪶 *Autor :* ${anu.authorName}\n`
				+ `⏲️ *Publicado :* ${anu.publishedTime}\n`
				+ `⌚ *Duración :* ${anu.durationH}\n`
				+ `👁️ *Vistas :* ${anu.viewH}\n`
				+ `🌀 *Url :* ${url}`
				await conn.sendMsg(m.chat, { image: { url: anu.thumbnail.split("?")[0] }, caption: txt }, { quoted: m })
			} catch (e) {
				console.log(e)
				return m.reply(`No se han encontrado resultados.`)
			}
		}
	}
	if (!url) return
	try {
		let res = await youtubedl(url)
		let data = res.audio[Object.keys(res.audio)[0]]
		let site = await data.download()
		if (data.fileSize > 400000) return m.reply(`Tamaño: ${data.fileSizeH}\n No se puede enviar, archivo máximo 400 MB`)
		await conn.sendMsg(m.chat, { audio: { url: site }, mimetype: 'audio/mpeg' }, { quoted : m })
	} catch (e) {
		console.log(e)
		try {
			let res = await ytdl.getURLVideoID(url)
			let anu = await ytdl.getInfo(res)
			anu = anu.formats.filter(v => v.mimeType.includes('audio/mp4'))[0]
			let size = parseInt(anu.contentLength)
			if (size > 400000000) return m.reply(`Tamaño: ${niceBytes(size)}\nNo se puede enviar, archivo máximo 400 MB`)
			await conn.sendMsg(m.chat, { audio: { url: anu.url }, mimetype: 'audio/mpeg' }, { quoted : m })
		} catch (e) {
			console.log(e)
			m.reply(e)
		}
	}
}

handler.menudownload = ['ytplay <txt> / <url>']
handler.tagsdownload = ['search']
handler.command = /^(play|(play)?yt(play|dl)?)$/i

export default handler