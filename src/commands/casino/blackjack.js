const { ReadData } = require("../../controllers")
const { EmbedBuilder, ActionRowBuilder } = require("discord.js")


function InitBlackJack(bot, interaction) {
    
    let data = ReadData("card")
    let deck = []

    for (let i = 0; i < 6; i++) {
        for (let i = 0; i < 52; i++) {
            deck.push(data[i])
        }
    }

    let buttons = new ActionRowBuilder().addComponents(
        new ButtonBuilder()
        .setCustomId(`casino/blackjack/draw`)
        .setLabel(`Carte !`)
        .setStyle("Secondary"),
        new ButtonBuilder()
        .setCustomId(`casino/blackjack/stop`)
        .setLabel(`Stop`)
        .setStyle("Secondary")
    )

    interaction.update({
        embeds: [
            new EmbedBuilder()
            .setColor("#ffffff")
            .setTitle(`__BLACK JACK__`)
            .setDescription(`Ouai la description`)
        ],
        components: [
            buttons
        ]
    })
}

function DrawBlackJack(bot, interaction) {
    console.log("Permet de piocher une carte");
}

function MessageBlackJack(bot, interaction) {

    let buttons = new ActionRowBuilder().addComponents(
        new ButtonBuilder()
        .setCustomId(`casino/page/<`)
        .setLabel(`Carte !`)
        .setStyle("Secondary"),
        new ButtonBuilder()
        .setCustomId(`casino/play`)
        .setLabel(`Stop`)
        .setStyle("Secondary")
    )

    interaction.update({
        embeds: [
            new EmbedBuilder()
            .setColor("#ffffff")
            .setTitle(`__BLACK JACK__`)
            .setDescription(`Ouai la description`)
        ],
        components: [
            buttons
        ]
    })
}

function RevealCard(bot, interaction) {
    console.log("Révèle les cartes du croupier");
}

module.exports = { InitBlackJack, DrawBlackJack, MessageBlackJack, RevealCard }