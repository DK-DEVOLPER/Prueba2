import db from '../../lib/database.js'
import { promises } from 'fs'
import { join } from 'path'
import { xpRange } from '../../lib/levelling.js'
import fs from 'fs'

let handler = async (m, { conn, isPrems }) => {
	let { limit } = db.data.users[m.sender]
	let lemon
	if (isPrems) {
		lemon = `~ Infinito ~`
	} else {
		lemon = limit
	}
	await m.reply(`*「 LIMITE 」*
Su limite : ${lemon}

🍻NOTA : Para obtener el límite, puedes jugar juegos, usa *.buy* 🍻`)
}

handler.menufun = ['limites']
handler.tagsfun = ['rpg']
handler.command = /^(limites)$/i

export default handler