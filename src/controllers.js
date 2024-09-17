let fs = require("fs");
const { EmbedBuilder } = require("discord.js");

function ReadData(file) {
  return JSON.parse(fs.readFileSync(`${(__dirname, "./")}/data/${file}.json`, "utf8"));
}

function RandomNumber(max) {
    return Math.floor(Math.random() * max)
}

function SendError(interaction, description) {

    interaction.reply({
        embeds:[ 
            new EmbedBuilder()
            .setColor("#c83232")
            .setTitle(`Action impossible !`)
            .setDescription(description == 999 ? `Tu ne peux pas effectuer cet action...` : `*${description}*`)
        ],
        ephemeral: 
            true
    })
}

module.exports = { ReadData, SendError, RandomNumber }