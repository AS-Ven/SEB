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
    }
}

module.exports = { commandHandler };
  