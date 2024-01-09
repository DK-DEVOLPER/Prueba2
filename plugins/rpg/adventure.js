//const cooldown = 1000 // 1 detik
//const cooldown = 60000 // 1 menit
//const cooldown = 3600000 // 1 jam
//const cooldown = 86400000 // 1 hari
//const cooldown = 2592000000 // 1 bulan
import db from '../../lib/database.js'
import { ranNumb } from '../../lib/func.js'

const cooldown = 900000

let handler = async (m, { usedPrefix, command }) => {
	let user = db.data.users[m.sender]
	let timers = (cooldown - (new Date - user.lastadventure))
	if (user.health < 80) return m.reply(`Tienes menos de *❤️ 80 de vida* no puedes usar ${command}!!\n\nEscribe *${usedPrefix}heal* para restaurar tu salud.\nO *${usedPrefix}use potion* para usar una poción.`)
	if (new Date - user.lastadventure <= cooldown) return m.reply(`Tienes que esperar para ir de aventura de nuevo\n*🕐${timers.toTimeString()}*`)

	user.adventurecount += 1

	const health = ranNumb(3, 6)
	const money = ranNumb(1000, 3000)
	const exp = ranNumb(500, 1000)
	const trash = ranNumb(10, 50)
	const rock = ranNumb(1, 4)
	const wood = ranNumb(1, 4)
	const string = ranNumb(1, 3)
	const common = ranNumb(1, 2)
	const gold = 1
	const emerald = 1
	const diamond = 1

	user.health -= health
	user.money += money
	user.exp += exp
	user.trash += trash
	user.rock += rock
	user.wood += wood
	user.string += string
	if (user.adventurecount % 25  == 0) user.common  += common
	if (user.adventurecount % 50  == 0) user.gold	+= gold
	if (user.adventurecount % 150 == 0) user.emerald += emerald
	if (user.adventurecount % 400 == 0) user.diamond += diamond

	let txt = `[ *Resultados de ${command}* ]\n\n`
	txt += `*❤️ Salud : -${health}*\nRecompensas :\n`
	txt += `*💵 dinero :* ${money}\n`
	txt += `*✉️ exp :* ${exp}\n`
	txt += `*🗑 basura :* ${trash}\n`
	txt += `*🪨 roca :* ${rock}\n`
	txt += `*🪵 madera :* ${wood}\n`
	txt += `*🕸️ cuerda :* ${string}`
	if (user.adventurecount % 25  == 0) txt += `\n\nBonus de aventura ${user.adventurecount}\n*📦 comun :* ${common}`
	if (user.adventurecount % 50  == 0) txt += `\n\nBonus de aventura ${user.adventurecount}\n*👑 oro :* ${gold}`
	if (user.adventurecount % 150 == 0) txt += `\n\nBonus de aventura ${user.adventurecount}\n*💚 esmeralda :* ${emerald}`
	if (user.adventurecount % 400 == 0) txt += `\n\nBonus de aventura ${user.adventurecount}\n*💎 diamante :* ${diamond}`
	m.reply(txt)
	user.lastadventure = new Date * 1
}

handler.menufun = ['aventura']
handler.tagsfun = ['rpg']
handler.command = /^(aventura|(ber)?petualang(ang)?|mulung)$/i

handler.cooldown = cooldown

export default handler