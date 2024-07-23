const { EmbedBuilder } = require('discord.js');
const { PREFIX } = require('../index');

const phrases = [
    "Oh great, the ultimate user error has logged in!",
    "Welcome, you glorious exception in the code of life!",
    "Well, if it isn't the master of bugs and glitches!",
    "Hello, you magnificent stack overflow of a human!",
    "Hi there, you charmingly broken piece of software!",
    "What's up, you delightful 404 error!",
    "Greetings, you brilliantly undefined variable!",
    "Hey, if it isn't the living embodiment of a syntax error!",
    "Hello, you splendidly unhandled exception!",
    "Oh, it's the epic fail of the programming world!",
    "Greetings my bitchie"
];

module.exports = {
    description: 'Saluda a miembro del server, si no etiquetas a ninguno envia el saludo al invocador del comando',
    run: async (message) => {
        const target = message.mentions.users.first() || message.author;
        const member = await message.guild.members.fetch(target.id);
        if (!member) return message.reply("Invalid user");
        const avatar = member.user.displayAvatarURL({size: 256});

        const randomPhrase = phrases[Math.floor(Math.random() * phrases.length)];

        const embed = new EmbedBuilder()
            .setColor('Blurple')
            .setTitle(`${randomPhrase} ${member.user.displayName}`)
            .setImage(avatar)
        
        await message.reply({embeds: [embed]})
        
        await message.delete().catch(err => console.error('Failed to delete original message:', err));
    }
}