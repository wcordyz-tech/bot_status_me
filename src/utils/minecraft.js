const util = require('minecraft-server-util');

async function getServerStatus(host, port = 25565) {
    try {
        // Menggunakan statusJava untuk server Java Edition
        const result = await util.statusJava(host, Number(port), { timeout: 3000 });
        return {
            online: true,
            motd: result.motd.clean,
            playersOnline: result.players.online,
            playersMax: result.players.max,
            version: result.version.name,
            favicon: result.favicon
        };
    } catch (error) {
        return {
            online: false
        };
    }
}

module.exports = { getServerStatus };