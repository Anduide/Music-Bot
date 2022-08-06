const client = require('../index').client

client.on('interactionCreate', async interaction => {
    if (!interaction.isChatInputCommand()) return;
    console.log(interaction.commandName)
    let cmd = client.commands.get(interaction.commandName)
    if (!cmd) return;
    
    // if(cmd.category = 'music') {
    //     if (!interaction.member.voice.channelId)
    //         return await interaction.reply({ content: "Tham gia bất kì voice nào để sử dụng lệnh!", ephemeral: true });
    //     if (interaction.guild.members.me.voice.channelId && interaction.member.voice.channelId !== interaction.guild.members.me.voice.channelId)
    //         return await interaction.reply({ content: "Bạn không có trong voice của bot!", ephemeral: true });
    // }

    cmd.execute(client, interaction)
});