const { BlackJackDatas, BlackJackProfil } = require("../../constructor")
const { ReadData, WriteData, RandomNumber} = require("../../controllers")
const { EmbedBuilder, ActionRowBuilder, ButtonBuilder } = require("discord.js")


function InitBlackJack(bot, interaction) {
    let data = ReadData("blackjack")
    let deck = ReadData("card")

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
    player.card = []
    player.dealer = []
    player.round ++

    for (let i = 0; i < 2; i++) {
        let card = RandomNumber(deck.length - 2)
        player.card.push(deck[card])

        card = RandomNumber(deck.length - 2)
        player.dealer.push(deck[card])
    }

    WriteData("blackjack", data)

    MessageBlackJack(bot, interaction, false)
}

function EndBlackJack(bot, interaction) {
    let data = ReadData("blackjack")
    let player = data.players.find((_player) => _player.id == interaction.member.id)
    let croupier = player.dealer
    let croupierCards = []
    let joueur = player.card
    let joueurCards = []

    croupier.forEach(carte => {
        switch(carte.suit) {
            case "club":
                croupierCards.push(`<:club:1293464060175581215> ${carte.value.charAt(0).toUpperCase()}`)
                break
            case "spade":
                croupierCards.push(`<:spade:1293464080740519976> ${carte.value.charAt(0).toUpperCase()}`)
                break
            case "heart":
                croupierCards.push(`<:heart:1293464102693376000> ${carte.value.charAt(0).toUpperCase()}`)
                break
            case "diamond":
                croupierCards.push(`<:diamond:1293464144632221697> ${carte.value.charAt(0).toUpperCase()}`)
                break
        }
    });

    joueur.forEach(carte => {
        switch(carte.suit) {
            case "club":
                joueurCards.push(`<:club:1293464060175581215> ${(carte.value == "10" ? "10" : carte.value.charAt(0).toUpperCase())}`)
                break
            case "spade":
                joueurCards.push(`<:spade:1293464080740519976> ${(carte.value == "10" ? "10" : carte.value.charAt(0).toUpperCase())}`)
                break
            case "heart":
                joueurCards.push(`<:heart:1293464102693376000> ${(carte.value == "10" ? "10" : carte.value.charAt(0).toUpperCase())}`)
                break
            case "diamond":
                joueurCards.push(`<:diamond:1293464144632221697> ${(carte.value == "10" ? "10" : carte.value.charAt(0).toUpperCase())}`)
                break
        }
    });

    let buttons = new ActionRowBuilder().addComponents(
        new ButtonBuilder()
        .setCustomId(`casino/blackjack/init/${interaction.member.id}`)
        .setLabel(`Prochaine manche`)
        .setStyle("Secondary"),
        new ButtonBuilder()
        .setCustomId(`casino/blackjack/delete/${interaction.member.id}`)
        .setLabel(`Fin de partie`)
        .setStyle("Secondary")
    )

    interaction.update({
        embeds: [
            new EmbedBuilder()
            .setColor("#ffffff")
            .setTitle(`__B L A C K - J A C K__`)
            .setDescription(`Manche **${player.round}**\n Record : **${player.maxScore}**\n Score : **${player.score}**`)
            .addFields({
                name: `Croupier ${MathsBlackJack(bot, interaction)[1]}`,
                value: `${croupierCards.join(" - ")}`,
                inline: true
            })
            .addFields({
                name: `\u200b`,
                value: `\u200b`,
                inline: true
            })
            .addFields({
                name: `Joueur ${MathsBlackJack(bot, interaction)[0]}`,
                value: `${joueurCards.join(" - ")}`,
                inline: true
            })
        ],
        components: [
            buttons
        ]
    })
}

function DeleteBlackJack(bot, interaction) {
    console.log("supp les data");
}

function DrawBlackJack(bot, interaction) {
    let data = ReadData("blackjack")
    let deck = ReadData("card")
    let player = data.players.find((_player) => _player.id == interaction.customId.split("/")[3])
    let card = RandomNumber(deck.length - 2)
    
    player.card.push(deck[card])

    card = RandomNumber(deck.length - 2)
    player.dealer.push(deck[card])

    WriteData("blackjack", data)
    MessageBlackJack(bot, interaction, false)
}

function StopBlackJack(bot, interaction) {
    DealerDrawBlackJack(bot, interaction)

    let data = ReadData("blackjack")
    let player = data.players.find((_player) => _player.id == (interaction.customId.split("/")[3] ? interaction.customId.split("/")[3] : interaction.member.id))
    joueur = MathsBlackJack(bot, interaction)[0]
    croupier = MathsBlackJack(bot, interaction)[1]
    let roundScore = Math.abs((parseInt(joueur) - parseInt(croupier)) * 10)

    if (joueur == 21) {
        console.log("là c'est chiant");
        if (player.card.length == 2 && player.card.find((carte) => carte.value == "jack") && player.card.find((carte) => carte.value == "10")) {
            if (player.dealer.length == 2 && player.dealer.find((carte) => carte.value == "jack") && player.dealer.find((carte) => carte.value == "10")) {
                console.log("DRAW - DOUBLE BLACKJACK");
            } else {
                console.log("BLACKJACK !");
                player.score += roundScore * 2
            }
        }

    } else if (joueur < croupier && croupier <= 21 || joueur > 21) {
        console.log("loose");
        player.score -= roundScore

    } else if (joueur > croupier && joueur < 21 || croupier > 21) {
        console.log("win");
        player.score += roundScore

    } else if (joueur == croupier) {
        console.log("draw");

    } else {
        console.log("C'était pas prévu ça...");
        console.log(joueur, croupier);
        console.log("C'était pas prévu ça...");
    }

    if (player.maxScore < player.score)
        player.maxScore = player.score

    WriteData("blackjack", data)
    EndBlackJack(bot, interaction)
}

function DoubleDown(bot, interaction) {
    console.log("Doublez la charge !");
}

function MathsBlackJack(bot, interaction) {
    let data = ReadData("blackjack")
    let player = data.players.find((_player) => _player.id == (interaction.customId.split("/")[3] ? interaction.customId.split("/")[3] : interaction.member.id))
    let playerValue = 0
    let dealerValue = 0

    player.card.forEach(carte => {
        switch (carte.value) {
            case "king":
            case "queen":
            case "jack":
                playerValue += 10
                break
            case "ace":
                playerValue += 11
                break
            default:
                playerValue += parseInt(carte.value)
                break
        }
    });
    if (playerValue > 21) {
        playerValue = 0
        player.card.forEach(carte => {
            switch (carte.value) {
                case "king":
                case "queen":
                case "jack":
                    playerValue += 10
                    break
                case "ace":
                    playerValue += 1
                    break
                default:
                    playerValue += parseInt(carte.value)
                    break
            }
       })
    }

    player.dealer.forEach(carte => {
        switch (carte.value) {
            case "king":
            case "queen":
            case "jack":
                dealerValue += 10
                break
            case "ace":
                dealerValue += 11
                break
            default:
                dealerValue += parseInt(carte.value)
                break
        }
    });
    if (dealerValue > 21) {
        dealerValue = 0
        player.dealer.forEach(carte => {
            switch (carte.value) {
                case "king":
                case "queen":
                case "jack":
                    dealerValue += 10
                    break
                case "ace":
                    dealerValue += 1
                    break
                default:
                    dealerValue += parseInt(carte.value)
                    break
            }
       })
    }
    return [playerValue, dealerValue]
}

function DealerDrawBlackJack(bot, interaction) {
    console.log("Le croupier réfléchi à ses cartes");
}

function MessageBlackJack(bot, interaction, reveal) {
    MathsBlackJack(bot, interaction)
    let data = ReadData("blackjack")
    let player = data.players.find((_player) => _player.id == interaction.member.id)
    let croupier = player.dealer
    let croupierCards = []
    let joueur = player.card
    let joueurCards = []

    if (reveal == false) {
            switch(croupier[0].suit) {
                case "club":
                    croupierCards.push(`<:club:1293464060175581215> ${croupier[0].value.charAt(0).toUpperCase()}`)
                    break
                case "spade":
                    croupierCards.push(`<:spade:1293464080740519976> ${croupier[0].value.charAt(0).toUpperCase()}`)
                    break
                case "heart":
                    croupierCards.push(`<:heart:1293464102693376000> ${croupier[0].value.charAt(0).toUpperCase()}`)
                    break
                case "diamond":
                    croupierCards.push(`<:diamond:1293464144632221697> ${croupier[0].value.charAt(0).toUpperCase()}`)
                    break
            }
            for (let i = 1; i < croupier.length; i++) {
                croupierCards.push(`<:card_back:1285699946019950694>`)
            }
    } else {
        croupier.forEach(carte => {
            switch(carte.suit) {
                case "club":
                    croupierCards.push(`<:club:1293464060175581215> ${carte.value.charAt(0).toUpperCase()}`)
                    break
                case "spade":
                    croupierCards.push(`<:spade:1293464080740519976> ${carte.value.charAt(0).toUpperCase()}`)
                    break
                case "heart":
                    croupierCards.push(`<:heart:1293464102693376000> ${carte.value.charAt(0).toUpperCase()}`)
                    break
                case "diamond":
                    croupierCards.push(`<:diamond:1293464144632221697> ${carte.value.charAt(0).toUpperCase()}`)
                    break
            }
        });
    }

    joueur.forEach(carte => {
        switch(carte.suit) {
            case "club":
                joueurCards.push(`<:club:1293464060175581215> ${(carte.value == "10" ? "10" : carte.value.charAt(0).toUpperCase())}`)
                break
            case "spade":
                joueurCards.push(`<:spade:1293464080740519976> ${(carte.value == "10" ? "10" : carte.value.charAt(0).toUpperCase())}`)
                break
            case "heart":
                joueurCards.push(`<:heart:1293464102693376000> ${(carte.value == "10" ? "10" : carte.value.charAt(0).toUpperCase())}`)
                break
            case "diamond":
                joueurCards.push(`<:diamond:1293464144632221697> ${(carte.value == "10" ? "10" : carte.value.charAt(0).toUpperCase())}`)
                break
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
        .setStyle("Secondary"),
        new ButtonBuilder()
        .setCustomId(`casino/blackjack/double/${interaction.member.id}`)
        .setLabel(`Double`)
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
                value: `${croupierCards.join(" - ")}`,
                inline: true
            })
            .addFields({
                name: `\u200b`,
                value: `\u200b`,
                inline: true
            })
            .addFields({
                name: `Joueur`,
                value: `${joueurCards.join(" - ")}`,
                inline: true
            })
        ],
        components: [
            buttons
        ]
    })
}

module.exports = { InitBlackJack, EndBlackJack, DeleteBlackJack, DealerDrawBlackJack, DrawBlackJack, StopBlackJack, MessageBlackJack, MathsBlackJack, DoubleDown }