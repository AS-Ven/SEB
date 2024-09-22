let fs = require("fs");
const path = require("path");
const { EmbedBuilder } = require("discord.js");

function ReadData(file) {
  return JSON.parse(fs.readFileSync(`${(__dirname, "./")}/data/${file}.json`, "utf8"));
}

function WriteData(file, data) {
  fs.writeFileSync(`${path.join(__dirname, "../")}/data/${file}.json`, JSON.stringify(data), "utf8",
    function (err) {
      if (err) throw err;
    }
  );
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

module.exports = { ReadData, WriteData, SendError, RandomNumber }