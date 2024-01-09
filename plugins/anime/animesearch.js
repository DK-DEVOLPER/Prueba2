import fetch from 'node-fetch'

let handler = async (m, {conn, usedPrefix, command, text}) => {
    if (!text) throw `Ejemplo: *${usedPrefix}${command} Naruto`

    try {
        let anu = await (await fetch(`https://api.lolhuman.xyz/api/anime?apikey=${api.lol}&query=${text}`)).json()
        if (anu.result == 0) throw Error('El anime que buscas no fue encontrado.')
        let txt = `*Busqueda Anime*`
        let i = anu.result
            txt += `\n\nTitulo: *${i.title.romaji} (${i.title.english})*\n`
            txt += `Episodios: *${i.episodes}*\n`
            txt += `Duracion: *${i.duration}M*\n`
            txt += `Estado: *${i.status}*\n`
            for (let a of i.genres) {
                txt += `Genero: *${a}*\n`
            }
            txt += `Fecha de inicio: *${i.startDate.year}, ${i.startDate.month}, ${i.startDate.day}*\n`
            txt += `Fecha de realización: *${i.endDate.year}, ${i.endDate.month}, ${i.endDate.day}*\n`
            txt += `Sinopsis: *${i.description}*\n`
        console.log(anu)
        await conn.sendMsg(m.chat, {image: { url: anu.result.coverImage.large }, caption: txt }, { quotes: m })
    } catch (e) {
        m.reply('Título no encontrado/Servidor inactivo')
        console.log(e)
    }
}

handler.menuanime = ['buscaranime']
handler.tagsanime = ['search']
handler.command = /^(buscaranime)$/i

export default handler