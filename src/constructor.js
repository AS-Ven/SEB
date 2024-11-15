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
            this.maxScore = 100,
            this.score = 100,
            this.round = 0,
            this.card = [],
            this.dealer = [],
            this.time = ""
    }
}

module.exports = { BlackJackDatas, BlackJackProfil }