const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { getServerStatus } = require('../utils/minecraft');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('status')
        .setDescription('Menampilkan status server Minecraft saat ini.'),
    
    async execute(interaction) {
        await interaction.deferReply();

        const host = process.env.MC_SERVER_IP;
        const port = process.env.MC_SERVER_PORT;
        const status = await getServerStatus(host, port);

        const embed = new EmbedBuilder()
            .setTitle('🖥️ Status Server Minecraft')
            .setTimestamp();

        if (status.online) {
            embed.setColor('Green')
                .addFields(
                    { name: 'Status', value: '🟢 Online', inline: true },
                    { name: 'IP Server', value: `${host}:${port}`, inline: true },
                    { name: 'Pemain Online', value: `${status.playersOnline} / ${status.playersMax}`, inline: true },
                    { name: 'Versi', value: status.version, inline: true },
                    { name: 'MOTD', value: `\`\`\`${status.motd}\`\`\`` }
                );
        } else {
            embed.setColor('Red')
                .addFields(
                    { name: 'Status', value: '🔴 Offline / Tidak dapat dijangkau', inline: false },
                    { name: 'IP Server', value: `${host}:${port}`, inline: false }
                );
        }

        await interaction.editReply({ embeds: [embed] });
    },
};