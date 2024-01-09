import db from '../../lib/database.js'
import { isNumber } from '../../lib/func.js'

let handler = async (m, { conn, command, usedPrefix, args }) => {
	let user = db.data.users[m.sender]
	if (user.atm == 0) return m.reply(`[!] Aún no tienes una cuenta.\n\nusa el comando *${usedPrefix}atm crear*`)
	let total = Math.floor(isNumber(args[0]) ? Math.min(Math.max(parseInt(args[0]), 1), Number.MAX_SAFE_INTEGER) : 1) * 1
	if (command.includes('todo')) total = user.money
	if ((user.money - total) > 0) {
		user.money -= total
		user.atm += total
		m.reply(`Depositaste ${total} 💹`)
	} else {
		m.reply(`[❗] Tu dinero no es suficiente para depositar, tienes ${total} 💹`)
	}
}

handler.menufun = ['ahorro <monto>']
handler.tagsfun = ['rpg']
handler.command = /^((t|a)horrar(todo)?)$/i

export default handler