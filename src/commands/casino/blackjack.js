const { BlackJackDatas, BlackJackProfil } = require("../../constructor")
const { ReadData, WriteData, CheckPerms, RandomNumber} = require("../../controllers")
const { EmbedBuilder, ActionRowBuilder, ButtonBuilder } = require("discord.js")


function InitBlackJack(bot, interaction) {
    
    let data = ReadData("blackjack")

    if (data.players == undefined) {
        WriteData("blackjack", new BlackJackDatas())
        data = ReadData("blackjack")
    }
    
    if (!data.players.find((_player) => _player.id == interaction.member.id)) {
        data.players.push(new BlackJackProfil(interaction))
        WriteData("blackjack", data)
        data = ReadData("blackjack")
    }

    let player = data.players.find((_player) => _player.id == interaction.member.id)

    if (player.deck.length == 0) {
    let deck = player.deck

    for (let i = 0; i < 6; i++) {
        for (let i = 0; i < 52; i++) {
            deck.push(ReadData("card")[i])
        }
    }

    for (let i = 0; i < 2; i++) {
        let card = RandomNumber(player.deck.length)
        player.card.push(player.deck[card])
        player.deck.splice(card, 1)

        card = RandomNumber(player.deck.length)
        player.dealer.push(player.deck[card])
        player.deck.splice(card, 1)
    }

    WriteData("blackjack", data)
    }

    

    MessageBlackJack(bot, interaction)
}

function DrawBlackJack(bot, interaction) {
    let data = ReadData("blackjack")
    let player = data.players.find((_player) => _player.id == interaction.customId.split("/")[3])
    let card = RandomNumber(player.deck.length)
    
    player.card.push(player.deck[card])
    player.deck.splice(card, 1)

    card = RandomNumber(player.deck.length)
    player.dealer.push(player.deck[card])
    player.deck.splice(card, 1)
    

    WriteData("blackjack", data)
    MessageBlackJack(bot, interaction)
}

function StopBlackJack(bot, interaction) {
    console.log("Stop la pioche de carte");
}

function MessageBlackJack(bot, interaction) {
    let data = ReadData("blackjack")
    let player = data.players.find((_player) => _player.id == interaction.member.id)
    let croupier = player.dealer
    let croupierCards = ""
    let joueur = player.card
    let joueurCards = ""

    croupier.forEach(carte => {
        switch(croupier[i].suit) {
            case "club":
            croupierCards.push()
        }
    });

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
            .setTitle(`__B L A C K - J A C K__`)
            .setDescription(`Manche **${player.round}**\n Record : **${player.maxScore}**\n Score : **${player.score}**`)
            .addFields({
                name: `Croupier`,
                value: `${croupierCards}`,
                inline: true
            })
            .addFields({
                name: `a`,
                value: `a`,
                inline: true
            })
            .addFields({
                name: `Joueur`,
                value: `${joueurCards}`,
                inline: true
            })
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