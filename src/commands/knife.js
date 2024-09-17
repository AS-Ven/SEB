const { SlashCommandBuilder } = require("discord.js");
const { ReadData } = require("../controllers");
const { RandomNumber } = require("../controllers");

module.exports = {
    data: knife = new SlashCommandBuilder()
    .setName("knife")
    .setDescription("T'es pas le couteau le plus éguisé du tiroir"),

    async run(bot, interaction) {
        let data = ReadData("knife")
        let knife = data[RandomNumber(data.length)]

        interaction.reply(`C'est pas ${knife}...`)
    }
}