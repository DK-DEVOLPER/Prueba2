let handler = async(m, { conn, text, usedPrefix, command }) => {
	if (!text || !text.includes('|')) throw `Uso : ${usedPrefix + command} texto1|texto2|textl3\n\nEjemplo: *${usedPrefix + command} Shiro|Neko*`
	let [l, r, s] = text.split`|`
	if (!l) throw `Ingresa el texto1`
	if (!r) throw `Ingresa el texto2`
	if (!s) throw `Ingresa el texto3`
	try {
		let fimg = await fetch(`https://api.lolhuman.xyz/api/ephoto3/${command}?apikey=${api.lol}&text1=${encodeURIComponent(l)}&text2=${encodeURIComponent(r)}&text3=${encodeURIComponent(s)}`)
		if (!fimg.ok) throw new e()
		let fimgb = Buffer.from(await fimg.arrayBuffer())
		await conn.sendMsg(m.chat, { image: fimgb, caption: `_Ephoto 360 : ${command}_` }, { quoted: m })
	} catch (e) {
		m.reply(`Se produjo un error, inténtelo nuevamente más tarde..`)
	}
}

handler.menuephoto = ['valorantbanner <txt>']
handler.tagsephoto = ['search']
handler.command = /^(valorantbanner)$/i

handler.premium = true
handler.limit = true

export default handler