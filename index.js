
const { Client, Collection, GatewayIntentBits } = require('discord.js');
const { Player } = require('discord-player')
require('dotenv').config();

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildPresences,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildVoiceStates // nhan du lieu tu voice channel
    ]
});

const player = new Player(client)

player.on("trackStart", (queue, track) => {
    queue.metadata.channel.send(`Đang chơi bài **${track.title}**!`)
})

module.exports = { client };
client.commands = new Collection();

client.player = player;

// load event ready se load cac event khac ngoai ready
client.once('ready', () => {
    console.log("Đã sẵn sàng hoạt động!");
    require('./handlers/index');
});

client.on('error', console.error);
client.login(process.env.TOKEN, console.error);
