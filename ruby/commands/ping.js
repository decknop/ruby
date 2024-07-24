module.exports = {
    description: 'Prueba basica de comunicacion con bot',
    run: async (message) => {
       await message.reply('Pong!');
    }
}