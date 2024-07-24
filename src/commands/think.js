const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const { ReadData } = require("../controllers/controllerData");
const { RandomNumber } = require("../controllers/controllerRandom");

module.exports = { 
    data: think = new SlashCommandBuilder()
    .setName("think")
    .setDescription("Donne une phrase inspirante"),

    async run(bot, interaction) {
        let data = ReadData("think")
        let subject = data[RandomNumber(data.length)].subject
        let verbe = data[RandomNumber(data.length)].verbe
        let complement = data[RandomNumber(data.length)].complement
        let bonus = data[subject.id].bonus
        let embed = new EmbedBuilder()

        embed
            .setColor("#ffffff")
            .setDescription(`## ${subject.value} ${verbe.find((verbe_) => verbe_.pronoun == subject.pronoun).value} ${complement.value}`)
            if (subject.id == verbe[0].id && verbe[0].id == complement.id && subject.id != 999) embed.setColor("#ffff00").setImage(bonus.gif)

        interaction.reply({
            embeds: [
                embed
            ]
        })
    }
}