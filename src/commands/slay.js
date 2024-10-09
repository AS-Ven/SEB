const { SlashCommandBuilder } = require("discord.js")

module.exports = {
    data: slay = new SlashCommandBuilder()
    .setName("slay")
    .setDescription("Slay Queen"),

    async run(bot, interaction) {
        interaction.reply(`https://imgur.com/Z3DQDPp`)
    }
}