const { SlashCommandBuilder } = require("discord.js");
const { ReadData } = require("../controllers/controllerData");
const { RandomNumber } = require("../controllers/controllerRandom");

module.exports = {
    data: poop = new SlashCommandBuilder()
    .setName("poop")
    .setDescription("Va faire caca"),

    async run(bot, interaction) {
        let data = ReadData("poop")
        let poop = data[RandomNumber(data.length)]

        interaction.reply(poop);
    }
}