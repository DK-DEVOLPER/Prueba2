import db from '../../lib/database.js'

const rewards = {
	exp: 75000,
	money: 100000,
	potion: 12,
	wood: 12,
	rock: 12,
	string: 9,
	iron: 9,
	sand: 15,
}

const cooldown = 2592000000
let handler = async (m) => {
	let user = db.data.users[m.sender]
	if (new Date - user.lastmonthly < cooldown) throw `Ya has reclamado este reclamo mensual, espera *${((user.lastmonthly + cooldown) - new Date()).toTimeString()}*`
	let text = ''
	for (let reward of Object.keys(rewards)) if (reward in user) {
		user[reward] += rewards[reward]
		text += `*+${rewards[reward]}* ${rpg.emoticon(reward)}${reward}\n`
	}
	m.reply(text)
	user.lastmonthly = new Date * 1
}

handler.menufun = ['mensual']
handler.tagsfun = ['rpg']
handler.command = /^(mensual)$/i

handler.cooldown = cooldown

export default handler

