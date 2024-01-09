import db from '../../lib/database.js'
import fs from 'fs'

let handler = async (m, { conn, args }) => {
	let who = m.quoted ? m.quoted.sender : m.mentionedJid[0] ? m.mentionedJid[0] : m.isGroup ? m.sender : m.chat
	let user = db.data.users[m.sender]
	let target = db.data.users[who]
	if (args[0] == 'crear') {
		if (user.atm > 0) {
			m.reply(`[!] Has creado una cuenta.`)
		} else if (user.money < 50000) {
			m.reply(`[!] Mínimo tener 💵 50000 para depósito.`)
		} else {
			user.money -= 50000
			user.atm += 50000
			m.reply(`Creaste una cuenta con éxito.`)
		}
	} else {
		if (!target) return m.reply('[!] El usuario no existe en la base de datos.')
		if (user.level < target.level) return m.reply('[!] No puedo ver porque el nivel objetivo es más alto.')
		let name = await conn.getName(who)
		let thumb = fs.readFileSync('./media/bank.jpg')
		let anu = `🏦 Banco de *${name.replaceAll('\n','')}*\n\n`
		anu += `*💰 ATM :* ${target.atm}\n`
		anu += `*💵 Dinero :* ${target.money}\n\n`
		anu += `*👑 Oro :* ${target.gold}\n`
		anu += `*💎 Diamante :* ${target.diamond}\n`
		anu += `*💚 Esmeralda:* ${target.emerald}`
		await conn.sendMsg(m.chat, { image: thumb, caption: anu }, { quoted: m })
	}
}

handler.menufun = ['banco <opts>']
handler.tagsfun = ['rpg']
handler.command = /^(bank|atm|banco)$/i

export default handler