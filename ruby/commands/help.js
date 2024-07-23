const { User, messageLink, Embed, EmbedBuilder } = require('discord.js')
const fs = require('fs');
const path = require('path');

module.exports = {
    description: "Muestra la informacion del bot y sus comandos",
    run: async (message) => {
        
        const botName = message.client.user.displayName;
        const avatar = message.client.user.displayAvatarURL({size: 256});
        
        const embed = new EmbedBuilder()
            .setColor('Blurple')
            .setTitle(`I am ${botName} and you are my bitches`)
            .setImage(avatar)
        
            // Revisar comandos disponibles en archivos
        const commandFiles = fs.readdirSync(path.join(__dirname, '..', 'commands')).filter(file => file.endsWith('.js'));

        // Construye la sección de comandos
        let commandsList = '';
        commandFiles.forEach(file => {
            const command = require(`../commands/${file}`);
            if (command.description) {
                commandsList += `**${path.parse(file).name}**: ${command.description}\n`;
            }
        });

        // Añade la lista de comandos al embed
        embed.addFields({
            name: 'Commands',
            value: commandsList || 'No commands available.',
            inline: false
        });
        
        await message.reply({embeds: [embed]})
    }
}