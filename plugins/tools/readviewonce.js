let handler = async (m, { conn }) => {
	let q = m.quoted ? m.quoted : m
	let type = Object.keys(q.message || q)[0]
	if (!q.message?.[type].viewOnce) throw 'responde a un mensaje de una sola vez'
	try {
		let txt = (q.message[type].caption) || ''
		let buffer = await q.download()
		if (/audio/.test(type)) await conn.sendMsg(m.chat, { audio: buffer, ptt: true }, { quoted: m })
		else await conn.sendFile(m.chat, buffer, '', txt, null, false, { mentions: conn.parseMention(txt), quoted: m })
	} catch (e) {
		console.log(e)
		throw 'error (ya abierto)'
	}
}

handler.help = ['leer']
handler.tags = ['tools']
handler.command = /^((read)?viewonce|leer)$/i

export default handler
