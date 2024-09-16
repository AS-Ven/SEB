const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder } = require("discord.js");

module.exports = {
    data: fact = new SlashCommandBuilder()
    .setName("casino")
    .setDescription("Ouvre le menu du Casino"),

    async run(bot, interaction) {

        let page = 0
        let maxPage = 2

        let buttons = new ActionRowBuilder().addComponents(
            new ButtonBuilder()
            .setCustomId(`casino/page/<`)
            .setLabel(`◀️`)
            .setStyle("Secondary"),
            new ButtonBuilder()
            .setCustomId(`casino/play`)
            .setLabel(`Play`)
            .setStyle("Secondary"),
            new ButtonBuilder()
            .setCustomId(`casino/page/>`)
            .setLabel(`▶️`)
            .setStyle("Secondary")
        )

        interaction.reply({
            embeds: [
                new EmbedBuilder()
                .setColor("#ffffff")
                .setTitle(`__CASINO__`)
                .setDescription(`Frero faudra que tu penses à faire un texte ici parce que là c'est pas ouf si tu veux mon avis.`)
                .setFooter({ text: `${page} / ${maxPage}`, iconURL: `https://icons.veryicon.com/png/o/business/colorful-office-icons/book-52.png`})
            ],
            components: [
                buttons
            ]
        })
    }
}