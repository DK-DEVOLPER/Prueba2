let handler = async(m, { conn, text, usedPrefix, command }) => {
	if (!text || !text.includes('|')) throw `Uso : ${usedPrefix + command} texto1|texto2\n\nEj: *${usedPrefix + command} Shiro|Neko*`
	let [l, r] = text.split`|`
	if (!l) throw `Ingresa el texto1`
	if (!r) throw `Ingresa el texto2`
	try {
		let fimg = await fetch(`https://api.lolhuman.xyz/api/textprome2/pornhub?apikey=${api.lol}&text1=${encodeURIComponent(l)}&text2=${encodeURIComponent(r)}`)
		//if (!fimg.ok) throw 'Fitur Error'
		let fimgb = Buffer.from(await fimg.arrayBuffer())
		await conn.sendMsg(m.chat, { image: fimgb, caption: `_Text Pro : ${command}_` }, { quoted: m })
	} catch (e) {
		console.log(e)
		m.reply(`Se produjo un error, inténtelo nuevamente más tarde..`)
	}
}

handler.menutextpro = ['phub <texto1>|<texto2>']
handler.tagstextpro = ['search']
handler.command = /^(phub)$/i

handler.premium = true
handler.limit = true

export default handler