import db from '../../lib/database.js'

export async function all(m) {
	let chats = db.data.users[m.sender]
	if (!chats?.expired) return !0
	if (+new Date() > chats.expired) {
		try {
			let prems = db.data.datas.prems
			await this.reply(m.chat, '[!] La duración de tu premium ha finalizado.', m, { mentions: [m.sender] })
			chats.expired = null
			db.data.datas.prems = await prems.filter(v => v.user !== m.sender)
		} catch (e) {
			console.log(e)
		}
	}
}