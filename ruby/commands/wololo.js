const { EmbedBuilder, AttachmentBuilder } = require('discord.js');
const { PREFIX } = require('../index');

const wololo = [
    "@everyone Ya se la saben banda! Wololo!",
    "@everyone Kmara prros!! Wololo"
];


module.exports = {
    description: 'Convoca a la banda pal Wololo!',
    run: async (message) => {
        const target = message.mentions.users.first() || message.author;
        const member = await message.guild.members.fetch(target.id);
        if (!member) return message.reply("Invalid user");
        const avatar = member.user.displayAvatarURL({size: 256});
        const imagePath = './static/nos_vamos_todos.jpg';
        const attachment = new AttachmentBuilder(imagePath);

        const randomPhrase = wololo[Math.floor(Math.random() * wololo.length)];

        const embed = new EmbedBuilder()
            .setColor('Blurple')
            .setTitle(`${randomPhrase} ${member.user.displayName}`)
            .setImage('attachment://nos_vamos_todos.jpg')
        
        await message.reply({embeds: [embed], files: [attachment]})
        
        await message.delete().catch(err => console.error('Failed to delete original message:', err));
    }
}