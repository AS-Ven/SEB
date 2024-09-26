const { BlackJackDatas, BlackJackProfil } = require("../../constructor")
const { ReadData, WriteData, CheckPerms, RandomNumber} = require("../../controllers")
const { EmbedBuilder, ActionRowBuilder, ButtonBuilder } = require("discord.js")


function InitBlackJack(bot, interaction) {
    
    let data = ReadData("blackjack")
    let deck = []

    for (let i = 0; i < 6; i++) {
        for (let i = 0; i < 52; i++) {
            deck.push(ReadData("card")[i])
        }
    }
    
    if (data.players == undefined) {
        WriteData("blackjack", new BlackJackDatas())
        data = ReadData("blackjack")
    }

    if (data.players == 0) {
        data.players.push(new BlackJackProfil(interaction))
        WriteData("blackjack", data)
    }

    let buttons = new ActionRowBuilder().addComponents(
        new ButtonBuilder()
        .setCustomId(`casino/blackjack/draw/${interaction.member.id}`)
        .setLabel(`Carte !`)
        .setStyle("Secondary"),
        new ButtonBuilder()
        .setCustomId(`casino/blackjack/stop/${interaction.member.id}`)
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
    let data = ReadData("blackjack")
    let player = data.players.find((_player) => _player.id == interaction.customId.split("/")[3])
}

function StopBlackJack(bot, interaction) {
    console.log("Stop la pioche de carte");
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

module.exports = { InitBlackJack, DrawBlackJack, StopBlackJack, MessageBlackJack, RevealCard }