const { EmbedBuilder } = require("discord.js")
const { InitBlackJack } = require("../commands/casino/blackjack");
const { InitFastMaths } = require("../commands/casino/fastmaths");
const { SendError } = require("../controllers");


function CasinoPages(bot, interaction) {

      let page = parseInt(interaction.message.embeds[0].data.footer.text.split(" ")[0])
      let maxPage = parseInt(interaction.message.embeds[0].data.footer.text.split(" ")[2])
      let title = ""
      let description = ""

      if (interaction.customId.split("/")[2]) {
            switch (interaction.customId.split("/")[2]) {
                  case "<":
                        if (page >= 1) {
                              page --
                        } else {
                              page = maxPage
                        }
                        break;
                    case ">":
                        if (page + 1 <= maxPage) {
                              page ++
                        } else {
                              page = 0
                        }
                        break;
            }
      }

      switch (page) {
            case 0:
                  title = "LET'S GO GAMBLING"
                  description = "Ouai le Casino, OUAI !!"
                  break
            case 1:
                  title = "Black Jack"
                  description = "Petit Black Jack (mais sans argent tkt)"
                  break;
            case 2:
                  title = "Fast Maths"
                  description = "Ouai je sais, les gens aiment pas les maths. Mais c'est mon bot et c'est moi qui décide !"
                  break
            }

      interaction.update({
            embeds: [
                  new EmbedBuilder()
                  .setColor("#ffffff")
                  .setTitle(`${title}`)
                  .setDescription(`${description}`)
                  .setFooter({ text: `${page} / ${maxPage}`, iconURL: `https://icons.veryicon.com/png/o/business/colorful-office-icons/book-52.png`})
            ]
      })
}

function CasinoPlay(bot, interaction) {

      switch (interaction.message.embeds[0].data.title) {
            case "Black Jack":
                  InitBlackJack(bot, interaction)
                  break
            case "Fast Maths":
                  InitFastMaths(bot, interaction)
                  break
            default:
                  SendError(interaction, "Veillez sélectioner un jeu.")
      }
                  
}

module.exports = { CasinoPages, CasinoPlay }