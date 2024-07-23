// /commands/serverinfo.js
const { Client, GatewayIntentBits } = require('discord.js');

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

module.exports = {
    name: 'serverinfo',
    description: 'Muestra información del servidor',
    async run(message) {
        const guild = message.guild;

        if (!guild) {
            return message.reply('Este comando solo se puede usar en un servidor.');
        }

        const guildId = guild.id;
        await guild.channels.fetch();
        // const voiceChannels = guild.channels.cache;
        const voiceChannels = guild.channels.cache.filter(channel => channel.type === 2);
        // console.log(voiceChannels); 
        
        let response = `**Información del Servidor**\n\n**Guild ID**: ${guildId}\n\n**Canales de Voz**:\n`;

        voiceChannels.forEach(channel => {
            response += `- **Nombre**: ${channel.name}, **ID**: ${channel.id}\n`;
        });

        if (voiceChannels.size === 0) {
            response += 'No hay canales de voz en este servidor.';
        }

        message.channel.send(response);
    }
};
