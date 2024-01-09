import db from '../../lib/database.js'

export async function before(m, { isAdmin, isBotAdmin }) {
	let user = db.data.users[m.sender]
	if (!user) return !1
	if (user.permaban || user.bannedcd == 0) return !1
	if (new Date - user.lastbanned <= user.bannedcd) return !1
	user.lastbanned = 0
	user.bannedcd = 0
	user.banned = false
	await this.reply(m.chat, `@${(m.sender || '').replace(/@s\.whatsapp\.net/g, '')} Ya no está prohibido, no vuelvas a enviar spam, ¿vale?!`, fkontak, { mentions: [m.sender] })
	return !0
}