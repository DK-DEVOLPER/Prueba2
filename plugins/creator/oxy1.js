let handler = async(m, { conn, text, usedPrefix, command }) => {
	if (!text) throw `Ejemplo de uso *${usedPrefix + command} BunnyWalker*`
	try {
		let fimg = await fetch(`https://api.lolhuman.xyz/api/photooxy1/${command}?apikey=${api.lol}&text=${encodeURIComponent(text)}`)
		if (!fimg.ok) throw new e()
		let fimgb = Buffer.from(await fimg.arrayBuffer())
		await conn.sendMsg(m.chat, { image: fimgb, caption: `_Photo Oxy : ${command}_` }, { quoted: m })
	} catch (e) {
		m.reply(`Se produjo un error, inténtelo nuevamente más tarde.`)
	}
}

handler.menuoxy = ['shadow','cup','cup1','romance','smoke','burnpaper','lovemessage','undergrass','love','coffe','woodheart','woodenboard','summer3d','wolfmetal','nature3d','underwater','golderrose','summernature','fallleaves','flamming','harrypotter','carvedwood'].map(v => v + ' <text>')
handler.tagsoxy = ['search']
handler.command = /^(shadow|cup|cup1|romance|smoke|burnpaper|lovemessage|undergrass|love|coffe|woodheart|woodenboard|summer3d|wolfmetal|nature3d|underwater|golderrose|summernature|fallleaves|flamming|harrypotter|carvedwood)$/i

handler.premium = true
handler.limit = true

export default handler