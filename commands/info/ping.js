const { ApplicationCommandType } = require("discord.js")
module.exports = {
    name: "ping",
    description: "Xem ping cua bot",
    type: ApplicationCommandType.ChatInput,

    async execute(client, interaction) {
        interaction.reply(client.ws.ping + "ms")
    }
}
