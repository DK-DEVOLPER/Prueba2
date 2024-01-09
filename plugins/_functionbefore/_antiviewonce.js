import db from '../../lib/database.js'

export async function before(m) {
	if (!m.isGroup) return !1
	if (db.data.chats[m.chat].viewonce && m.message?.[m.mtype]?.viewOnce) {
		let buffer = await m.download()
		let i = `[ LEER AUTO ]\n\n👾 *Emisor* : @${m.sender.split`@`[0]}${m.text ? `\n\n*Texto citado :*\n${m.text}` : ''}`
		if (/audio/.test(m.mtype)) {
			let amsg = await this.sendMsg(m.chat, { audio: buffer, ptt: true })
			await this.reply(m.chat, `[ ANTI AUDIO 1 VE,]\n\n👾 *Emisor* : @${m.sender.split`@`[0]}`, amsg, { mentions: [m.sender] })
		} else await this.sendFile(m.chat, buffer, '', i, null, false, { mentions: [m.sender, ...this.parseMention(i)], quoted: m })
	}
	return !0
}