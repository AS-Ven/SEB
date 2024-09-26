class BlackJackDatas{
    constructor() {
        this.bestScores = {
            first : {
                id: "",
                score: 0
            },
            second : {
                id: "",
                score: 0
            },
            third : {
                id: "",
                score: 0
            }
        },
        this.players = []
    }
}

class BlackJackProfil {
    constructor(interaction) {
            this.id = interaction.user.id,
            this.maxScore = 0,
            this.score = 0,
            this.card = [],
            this.dealer = [],
            this.deck = [],
            this.time = ""
    }
}

module.exports = { BlackJackDatas, BlackJackProfil }