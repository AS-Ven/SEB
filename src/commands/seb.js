const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder } = require("discord.js");

module.exports = {
    data: fact = new SlashCommandBuilder()
    .setName("seb")
    .setDescription("Affiche toutes les info utile sur S.E.B."),

    async run(bot, interaction) {

        let buttons = new ActionRowBuilder().addComponents(
            new ButtonBuilder()
            .setCustomId(`seb/commandes`)
            .setLabel(`Commandes`)
            .setStyle("Secondary")
        )

        interaction.reply({
            embeds: [
                new EmbedBuilder()
                .setColor("#ffffff")
                .setTitle(`__Guide des infos pratiques de S.E.B.__`)
                .setDescription(`Bonjour ${interaction.user.globalName}, je m'appele S.E.B. !\nCette commade te permets d'en savoir plus à propos de moi, je t'invite à utiliser les boutons pour te ballader dans mon guide\n\nSi tu ne trouves pas ce que tu cherches, tu peux contacter mon créateur` + " `stonos`.")
            ],
            components: [
                buttons
            ],
            ephemeral: 
                true
        })
    }
}