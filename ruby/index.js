// importando dependencias
const { Client, Events, GatewayIntentBits } = require('discord.js')
require('dotenv').config(); // <-- Gestion de variables de entorno para el token
const schedule = require('node-schedule');

// Obtenemos el token de nuestras variables de entorno
const TOKEN = process.env.TOKEN;

// Definimos el prefijo que funcionara como trigger a los comandos
const PREFIX = '!';

// cliente de Discord
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers
    ]
});

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);

    schedule.scheduleJob('0 9 * * *', () => {
        eventsCommand.run({ client }).catch(console.error);
    });
});
  
client.on(Events.MessageCreate, async(message) => {
    // Restricciones de seguridad
    if(message.author.bot) return; // <-- evitamos que el bot pueda enviar comandos
    if(!message.content.startsWith(PREFIX)) return; // <-- evitamos responder mensajes que no sean comandos

    const commandBody = message.content.slice(PREFIX.length).trim(); // Contiene el texto del comando sin el prefijo y sin espacios extras
    const args = commandBody.split(/ +/); // Es un array que contiene el comando y sus argumentos. regex: uno o mas espacios en blanco / +/.
    const command = args.shift().toLowerCase(); // Es el primer elemento del array args, que representa el comando principal.

    try {
        const cmd = require(`./commands/${command}`);
        cmd.run(message);
    } catch (error) {
        const now = new Date();
        console.error(`[${now.toISOString()}] Something went wrong: ${error.message}`);
    }
});

// Exporta el prefijo para que otros archivos puedan usarlo
module.exports = { PREFIX };

client.login(TOKEN);