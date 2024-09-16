const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const { ReadData } = require("../controllers/controllerData");
const { RandomNumber } = require("../controllers/controllerRandom");

module.exports = {
    data: anime = new SlashCommandBuilder()
    .setName("anime")
    .setDescription("Recommande un manga ou animé")
    .addStringOption(option =>
        option.setName("genre")
        .setDescription("Filtre les animés selon un genre spécifique")
        .setRequired(false)
        .setAutocomplete(true)),

    async run(bot, interaction) {
        let data = ReadData("anime")

        if (interaction.isAutocomplete()) {
            let focusedOption = interaction.options.getFocused(true)
            let choices = []
            data.forEach(anime => {
                anime.genres.forEach(genre => {
                    if (!choices.includes(genre))
                        choices.push(genre)
                })
            })


            let filteredChoices = choices.filter(choice => choice.startsWith(focusedOption.value.toLowerCase()))
            await interaction.respond(filteredChoices.map(choice => ({name: choice, value: choice})))
        }
        else 
        {
            let choose = interaction.options._hoistedOptions[0].value
            let anime = data[RandomNumber(data.length)]
            let saison = "" 
            let genre = ""

            if (choose) {
                let animelist = []
                data.forEach(anime_ => {
                    if (anime_.genres.includes(choose))
                        animelist.push(anime_)
                })
            anime = animelist[RandomNumber(animelist.length)]
            }
            
            if (anime.studio) {
                anime.watch.forEach(s => {
                    saison += `> [${s.name} : ${s.episod}](${s.link})\n`
                })
            } else {
                saison = `> ${anime.tome} volumes`
            }


            genre = `${anime.genres.join(" - ")}`
            
            interaction.reply({
                embeds: [
                    new EmbedBuilder()
                    .setColor("#ffffff")
                    .setDescription(`
                        ## __${anime.name}__
                        ${anime.year[0] == anime.year[1] ? anime.year[0] : anime.year[0] + " - " + anime.year[1]}
                        ${anime.studio ? "Studio : " + anime.studio : "Éditeur fr : " + anime.editor}
                        ${genre}
                        ${saison}
                    `)
                    .setFields(
                            {name: `__Synopsis__`, value: `> ${anime.synopsis}`, inline: true},
                            {name: `__Avis Perso__`, value: `> ${anime.avis}`, inline: true}
                    )
                    .setImage(anime.img)
                    .setFooter({text: `${anime.watchedOn == "anime" ? "🖥️" : "📖"} - ${anime.statu}`})
                ]
            })
        }
    }
}