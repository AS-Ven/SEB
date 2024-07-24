require("dotenv").config();
const { Collection, GatewayIntentBits, Client } = require("discord.js");
const bot = new Client({ intents: GatewayIntentBits.Guilds });
const fs = require('fs');
const { commandHandler } = require("./src/commandHandler.js");
const path = require("path");

bot.commands = new Collection()
bot.commandArray = []

bot.on("ready", async () => {
    const foldersPath = path.join(__dirname, '/src/commands');
    const commandFiles = fs.readdirSync(foldersPath).filter(file => file.endsWith('.js'))
    for (const file of commandFiles) {
      const filePath = path.join(foldersPath, file);
      const command = require(filePath);
      bot.commands.set(command.data.name, command);
      bot.application.commands.create(command.data)
    }
  
    console.log("bot online");
    console.log(new Date().toLocaleString());
});

bot.on("interactionCreate", (interaction) => {
commandHandler(bot, interaction);
});

bot.login(process.env.BOT_TOKEN);
