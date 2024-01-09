import db from '../../lib/database.js'
import { isNumber } from '../../lib/func.js'

let handler = async (m, { args, usedPrefix }) => {
	let user = db.data.users[m.sender]
	if (user.health >= 100) return m.reply(`
Tu ❤️Salus esta completa!
`.trim())
	const heal = 40 + (user.cat * 4)
	let count = Math.max(1, Math.min(Number.MAX_SAFE_INTEGER, (isNumber(args[0]) && parseInt(args[0]) || Math.round((100 - user.health) / heal)))) * 1
	if (user.potion < count) return m.reply(`
Tu(s) 🥤Pocion(es) no son suficientes, tienes *${user.potion}* 🥤Pocion(es)
Escribe *${usedPrefix}buy poción ${count - user.potion}* para comprar 🥤Pocion(es)
`.trim())
	user.potion -= count * 1
	user.health += heal * count
	m.reply(`
Se usaron *${count}* 🥤Pocione(s) con éxito 
`.trim())
}

handler.menufun = ['curar']
handler.tagsfun = ['rpg']
handler.command = /^(curar)$/i

export default handler