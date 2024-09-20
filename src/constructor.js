class BlackJackProfil{
    constructor() {
        this.bestScore = {
            id: "",
            score: 0
        },
        this.secondScore = {
            id: "",
            score: 0
        },
        this.thirdScore = {
            id: "",
            score: 0
        }
        this.player = {
            id: "",
            maxScore: 0,
            score: 0,
            card: []
        }
        this.dealer = {
            card: []
        }
    }
}

module.exports = { BlackJackProfil }