const { ApplicationCommandType, ApplicationCommandOptionType } = require("discord.js")

module.exports = {
    name: "choi",
    description: "Chơi nhạc",
    type: ApplicationCommandType.ChatInput,
    options: [
        {
            name: "mu",
            type: ApplicationCommandOptionType.String,
            description: "Nhập nhạc bạn muốn nghe",
            required: true
        }
    ],
    // category: 'music',

    async execute(client, interaction) {
        const query = interaction.options.getString("query");
        const queue = client.player.createQueue(interaction.guild, {
            metadata: {
                channel: interaction.channel
            }
        });

        // verify vc connection
        try {
            if (!queue.connection) await queue.connect(interaction.member.voice.channel);
        } catch {
            queue.destroy();
            return await interaction.reply({ content: "Không thể tham gia voice!", ephemeral: true });
        }

        await interaction.deferReply();
        const track = await client.player.search(query, {
            requestedBy: interaction.user
        }).then(x => x.tracks[0]);
        if (!track) return await interaction.followUp({ content: `Không tìm thấy nhạc nào với tên **${query}**!` });

        queue.play(track);

        return await interaction.followUp({ content: `Đang chơi **${track.title}**!` });
    }
}
