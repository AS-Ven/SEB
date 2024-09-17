const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const { ReadData } = require("../controllers");
const { RandomNumber } = require("../controllers");

module.exports = {
    data: fact = new SlashCommandBuilder()
    .setName("fact")
    .setDescription("Donne une fun fact aléatoire"),

    async run(bot, interaction) {
        let data = ReadData("fact")
        let fact = data[RandomNumber(data.length)]

        interaction.reply({
            embeds: [
                new EmbedBuilder()
                .setColor("#ffffff")
                .setDescription(`## ${fact.title} !\n ${fact.text}`)
            ]
        })
    }
}