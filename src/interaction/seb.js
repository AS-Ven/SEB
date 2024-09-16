const { EmbedBuilder, ActionRowBuilder, ButtonBuilder } = require("discord.js")

function SebCommandes(bot, interaction) {

      let page = interaction.message.embeds[0].data.footer ? parseInt(interaction.message.embeds[0].data.footer.text.split(" ")[0]) : 0
      let maxPage = 6
      let title = ""
      let description = "Voici la partie qui concerne mes commandes. !\n\nEn utilisant les flèches, vous pourrez tourner les pages et découvrir les différentes commandes que mon maître m'a appris.\nMes commandes sont rangées dans l'ordre alphabétique et les doubles flèches permettent de tourner 5 pages d'un coup !"
      
      
      let buttons = new ActionRowBuilder().addComponents(
            new ButtonBuilder()
            .setCustomId(`seb/commandes/<<`)
            .setLabel(`⏪`)
            .setStyle("Secondary"),
            new ButtonBuilder()
            .setCustomId(`seb/commandes/<`)
            .setLabel(`◀️`)
            .setStyle("Secondary"),
            new ButtonBuilder()
            .setCustomId(`seb/commandes/>`)
            .setLabel(`▶️`)
            .setStyle("Secondary"),
            new ButtonBuilder()
            .setCustomId(`seb/commandes/>>`)
            .setLabel(`⏩`)
            .setStyle("Secondary")
      )

      if (interaction.customId.split("/")[2]) {
            switch (interaction.customId.split("/")[2]) {
                  case "<<":
                        if (page >= 5) {
                              page -= 5
                        } else {
                              page = 0
                        }
                        break;
                  case "<":
                        if (page >= 1) {
                              page --
                        } else {
                              page = 0
                        }
                        break;
                  case ">":
                        if (page + 1 <= maxPage) {
                              page ++
                        } else {
                              page = maxPage
                        }
                        break;
                  case ">>":
                        if (page + 5 <= maxPage) {
                              page += 5
                        } else {
                              page = maxPage
                        }
                        break;
            }
      }

      switch (page) {
            case 1:
                  title = "`/anime`"
                  description = "Cette commande vous recommande un anime ou manga aléatoire parmi la sélection de mon maître.\nMême si certains avis ne sont pas toujours des plus positifs, si une œuvre est proposé, c'est que mon maître la recommande malgré ses défauts.\nToutes les œuvres que vous verrez sont des œuvre que mon maître à vu ou lu.\n\nLes premières lignes vous indiques dans l'ordre :\n> **La date de l'œuvre**\n> Son **studio** ou son **éditeur français**\n> Ses **genres**\n> **Un lien pour voir l'anime (en vostfr)**\nLe **Synopsis** présente l'œuvre et l'**Avis Perso** permet à mon maître de se livrer concernant l'œuvre *(ce n'est donc pas objectif)*\nVous trouverez également sous l'**Image** un **icone** qui indique si mon maître à lu ou vu l'œuvre ainsi qu'un mot pour indiquer si l'œuvre est terminé ou toujours en cours.\n\nIl se peut que certaines informations ne soit pas à jour (notamment sur la parution des mangas) et c'est normal, mon maître à la flemme de tout maintenir à jour.\nSi vous voulez plus de détail sur une œuvre vous pouvez en parler à mon maître ou lui demander conseil directement."
                  break;
            case 2:
                  title = "`/fact`"
                  description = "Cette commande est simple, elle vous donne une information de culture général.\n\nMon maître en profite également pour caché des private joke donc ne soyez pas surpris de voir une informations qui n'a aucun sens.\n\nIl y a également des infos sur le lore du serveur discord Mada Mada que vous pouvez rejoindre en demandant à mon maître."
                  break
            case 3:
                  title = "`/knife`"
                  description = "Vous connaissez l'expression ''t'es pas le couteau le plus aiguisé du tiroir''' ?\nEt bien cette commande vous en donne une variante."
                  break
            case 4:
                  title = "`/poop`"
                  description = "Je dois dire une façon d'annoncer que quelqu'un va faire la grosse commission... Oui c'est tout...\nJe suis là pour donner vie aux idées de mon maître, pas pour les discuter."
                  break
            case 5:
                  title = "`/seb`"
                  description = "C'est la commande que vous venez d'utiliser.\nVous pouvez vous balader parmi mon guide pour mieux me comprendre et m'exploiter m'optimiser au mieux."
                  break
            case 6:
                  title = "`/think`"
                  description = "Cette commande vous donne une phrase philosophique généré aléatoirement.\nChaque morceau de phrase se relie à d'autre morceau. Si vous avez les trois mêmes morceaux, vous pourrez voir un easter egg !"
                  break
            }

      interaction.update({
            embeds: [
                  new EmbedBuilder()
                  .setColor("#ffffff")
                  .setTitle(`__Guide des commandes de S.E.B. :__ ${title}`)
                  .setDescription(`${description}`)
                  .setFooter({ text: `${page} / ${maxPage}`, iconURL: `https://icons.veryicon.com/png/o/business/colorful-office-icons/book-52.png`})
            ],
            components: [
                buttons
            ]
      })
}

module.exports = { SebCommandes }