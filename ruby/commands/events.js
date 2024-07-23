const { EmbedBuilder } = require('discord.js');

// Función para obtener eventos del servidor
async function fetchGuildEvents(guild) {
    try {
        // Obtén eventos programados del servidor
        const events = await guild.scheduledEvents.fetch();
        return events;
    } catch (error) {
        console.error('Error fetching guild events:', error);
        return []; // Retorna un array vacío en caso de error
    }
}

// Función para chequear y enviar recordatorios de eventos
async function checkEventos(client, channel) {
    const ahora = new Date();
    const guild = client.guilds.cache.first();
    if (!guild) {
        console.error('Guild not found');
        return;
    }

    const eventos = await fetchGuildEvents(guild);

    for (const evento of eventos.values()) { // Utiliza .values() para iterar sobre los eventos
        const fechaEvento = new Date(evento.scheduledStartTime);
        const tiempoRestante = fechaEvento - ahora;
        if (0 <= tiempoRestante && tiempoRestante < 3600000) { // Menos de una hora
            const embed = new EmbedBuilder()
                .setColor('Blurple')
                .setTitle(`Reminder: ${evento.name}`)
                .setDescription(`The event "${evento.name}" will start in less than an hour.`)
                .setTimestamp();

            if (channel) {
                await channel.send({ embeds: [embed] });
            }
        }
    }
}

// Exporta la función para usarla en index.js
module.exports = {
    description: 'Check and send reminders for scheduled events',
    run: async (message) => {
        const channel = message.channel;
        await checkEventos(message.client, channel);
    }
};
