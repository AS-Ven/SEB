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
    constructor(user) {
        this.player = {
            id: user.id,
            maxScore: 0,
            score: 0,
            card: [],
            dealer: [],
            deck: [],
            time: ""
        }
    }
}

module.exports = { BlackJackDatas, BlackJackProfil }