const { CasinoPages, CasinoPlay } = require("./interaction/casino");
const { SebCommandes } = require("./interaction/seb");

function commandHandler(bot, interaction) {
    if (!interaction.isCommand() && !interaction.isButton() && !interaction.isStringSelectMenu() && !interaction.isAutocomplete()) return

    const { commandName } = interaction;
    
    switch (commandName ? commandName : interaction.customId.split("/")[0]) {
        case "anime":
            bot.commands.get("anime").run(bot, interaction)
            break
        case "fact":
            bot.commands.get("fact").run(bot, interaction)
            break
        case "knife":
            bot.commands.get("knife").run(bot, interaction)
            break
        case "poop":
            bot.commands.get("poop").run(bot, interaction)
            break
        case "think":
            bot.commands.get("think").run(bot, interaction)
            break
        case "seb":
            switch(interaction.customId ? interaction.customId.split("/")[1] : commandName) {
                case "seb":
                    bot.commands.get("seb").run(bot, interaction)
                    break
                case "commandes":
                    SebCommandes(bot, interaction)
                    break
            }
        case "casino":
            switch(interaction.customId ? interaction.customId.split("/")[1] : commandName) {
                case "casino":
                    bot.commands.get("casino").run(bot, interaction)
                    break
                case "page":
                    CasinoPages(bot, interaction)
                    break
                case "play":
                    CasinoPlay(bot, interaction)
                    break
                case "blackjack":
                    
                    break
            }
            break
    }
}

module.exports = { commandHandler };
  