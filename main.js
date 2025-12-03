const moves = [
    { icon: document.querySelector(".moveOne"), value: 1, img: "./images/one.png" },
    { icon: document.querySelector(".moveTwo"), value: 2, img: "./images/two.png" },
    { icon: document.querySelector(".moveThree"), value: 3, img: "./images/three.png" },
    { icon: document.querySelector(".moveFour"), value: 4, img: "./images/four.png" },
    { icon: document.querySelector(".moveFive"), value: 5, img: "./images/five.png" },
    { icon: document.querySelector(".moveSix"), value: 6, img: "./images/six.png" }
]

const body = document.querySelector("body")
const button = document.querySelector(".button")

const startBtn = document.querySelector(".Start")
const startBtn2 = document.querySelector(".Start2")

const pauseBtn = document.querySelector(".Pause")
const continueBtn = document.querySelector(".Continue")
const exitBtn = document.querySelector(".Exit")

const HEADS = { element: document.querySelector(".headsButton"), value: "HEADS" }
const TAILS = { element: document.querySelector(".tailsButton"), value: "TAILS" }

const mtile = document.querySelector(".goneJS")
const mHistory = document.querySelector(".moveHistory")
const lastTile = mHistory.lastElementChild

const pThrowDisp = document.querySelector(".PlayerThrowDisp")
const bThrowDisp = document.querySelector(".BotThrowDisp")

const throwButton = document.querySelector(".moveButton")

const tossDiv = document.querySelector(".tossDiv")
const tossCaption = document.querySelector(".tossCaption")

const moveSection = document.querySelector(".moveSec")
const gameSection = document.querySelector(".gameSec")

const headStart = document.querySelector(".headStart")

const batButton = document.querySelector(".batButton")
const bowlButton = document.querySelector(".bowlButton")

const gameRunDisp = document.querySelector(".gameRunDisp")
const liveRuns = document.querySelector(".liveRuns")

const gameStats = document.querySelector(".gameStats")
const target = document.querySelector(".target")
const runsLeft = document.querySelector(".runsLeft")

const roleIcons = document.querySelector(".Icon")
const bRoleIcon = document.querySelector(".bot")
const pRoleIcon = document.querySelector(".player")



let defStats = {
    Toss: {
        pChoice: "",
        bChoice: "",
        tossRes: "",
        tossWinner: "",
    },
    inn1: {
        BATTING: "",
        BOWLING: "",
        throws: [
            defMoves = {
                botMove: 0,
                pMove: 0
            },
        ],
        SCORE: 0
    },
    inn2: {
        BATTING: "",
        BOWLING: "",
        throws: [
            defMoves = {
                botMove: 0,
                pMove: 0
            },
        ],
        SCORE: 0,
        TARGET: 0,
        runsLeft: 0
    },
    winner: ""
}

localStorage.setItem("defStats", JSON.stringify(defStats));

startBtn.onclick = () => {
    startBtn.remove()
    showdisp(tossDiv)
    showdisp(pauseBtn)
    showdisp(exitBtn)
    headStart.style.cssText = `
        justify-content: space-evenly;
    `
    alert('GAME STARTS :)')
}
pauseBtn.onclick = () => {
    hideDisp(pauseBtn)
    showdisp(continueBtn)
    alert('GAME PAUSED -_-')
    cursorBan(tossDiv)
    cursorBan(HEADS.element)
    cursorBan(TAILS.element)
}
continueBtn.onclick = () => {
    hideDisp(continueBtn)
    showdisp(pauseBtn)
    alert('GAME CONTINUED *~*')
}
exitBtn.onclick = () => {
    window.location.reload()
}


let gameHistory = JSON.parse(localStorage.getItem("defStats"))

HEADS.element.onclick = () => {
    gameHistory.Toss.pChoice = "HEADS"
    gameHistory.Toss.bChoice = "TAILS"
    Toss()
}
TAILS.element.onclick = () => {
    gameHistory.Toss.pChoice = "TAILS"
    gameHistory.Toss.bChoice = "HEADS"
    Toss()
}




function Toss() {
    showdisp(tossDiv)
    showdisp(gameSection)
    showdisp(moveSection)
    headStart.style.cssText = `
        position : absolute;
        top: 0%;
        width: 80%;
        justify-content: space-evenly;
        grid-column: 1 / 2;
        grid-row: 1 / 2;
    `
    tossCaption.innerText = `YOU CHOSE ${gameHistory.Toss.pChoice}! THROW YOUR MOVE!`
    hideDisp(HEADS.element)
    hideDisp(TAILS.element)

    for (let i = 0; i < moves.length; i++) {
        moves[i].icon.onclick = () => {
            throwButton.onclick = () => {
                let botMove = createBotMove()
                let sum = 0;
                sum += botMove + moves[i].value
                updateDisp(bThrowDisp, moves[botMove - 1].img)
                updateDisp(pThrowDisp, moves[i].img)
                gameHistory.Toss.tossRes = (sum % 2 === 0) ? "TAILS" : "HEADS"
                console.log(gameHistory.Toss.tossRes)
                gameHistory.Toss.tossRes = (sum % 2 === 0) ? "TAILS" : "HEADS"
                gameHistory.Toss.tossWinner = (gameHistory.Toss.tossRes === gameHistory.Toss.pChoice) ? "PLAYER" : "BOT"
                declareRole(gameHistory.Toss.tossWinner)
            }
        }
    }
}



function createBotMove() {
    return Math.ceil(Math.random() * 6)
}
function declareRole(winner) {
    if (winner === "PLAYER") {
        tossCaption.innerText = "YOU WON THE TOSS ^-^"
        showdisp(batButton)
        showdisp(bowlButton)
        batButton.onclick = () => {
            gameHistory.inn1.BATTING = "PLAYER"
            gameHistory.inn1.BOWLING = "BOT"
            gameHistory.inn2.BATTING = "BOT"
            gameHistory.inn2.BOWLING = "PLAYER"
            hideDisp(batButton)
            hideDisp(bowlButton)
            hideDisp(tossCaption)
            startinn("PLAYER-BATTING")
        }
        bowlButton.onclick = () => {
            gameHistory.inn1.BATTING = "BOT"
            gameHistory.inn1.BOWLING = "PLAYER"
            gameHistory.inn2.BATTING = "PLAYER"
            gameHistory.inn2.BOWLING = "BOT"
            hideDisp(batButton)
            hideDisp(bowlButton)
            startinn("BOT-BATTING")
        }
    }
    else {
        tossCaption.innerText = "YOU LOST THE TOSS *-*"
        let randompRole = Math.random()
        gameHistory.inn1.BATTING = (randompRole <= 0.5) ? "PLAYER" : "BOT"
        gameHistory.inn1.BOWLING = (randompRole <= 0.5) ? "BOT" : "PLAYER"
        gameHistory.inn2.BATTING = (randompRole <= 0.5) ? "BOT" : "PLAYER"
        gameHistory.inn2.BOWLING = (randompRole <= 0.5) ? "PLAYER" : "BOT"
    }
    console.log(gameHistory)

    if (gameHistory.inn1.BATTING === "PLAYER") {
        tossCaption.innerText = "START THROWING MOVES, YOURE BATTING!"
        startinn("PLAYER-BATTING")
    } else if (gameHistory.inn1.BATTING === "BOT") {
        tossCaption.innerText = "START THROWING MOVES, YOURE BOWLING!"
        startinn("BOT-BATTING")
    } else {
        tossCaption.innerText = ""
    }

}

function showdisp(element) {
    element.classList.remove("hidden");
}
function hideDisp(element) {
    element.classList.add("hidden");
}
function updateDisp(element, image) {
    element.style.cssText = `
            background-image: url(${image})
        `
}
function cursorBan(element) {
    element.style.cursor = "not-allowed"
}
function cursorOn(element) {
    element.style.cursor = "pointer"
}
function addTile(a, b) {
    //css dom changes for moveSection
    mtile.remove()
    const mBox = document.createElement('div')
    mBox.className = "moveHist-Tile"
    mBox.innerHTML = `
    <div class="botMove">
        <div class="bot-icon"></div>
        <p class="bot-moveNumber">${a}</p>
    </div>
    <div class="playerMove">
        <div class="player-icon"></div>
        <p class="player-moveNumber">${b}</p>
    </div>`;
    mHistory.appendChild(mBox);
    mHistory.scrollTop = mHistory.scrollHeight;
}

function startinn(decision) {
    hideDisp(batButton)
    hideDisp(bowlButton)
    showdisp(gameRunDisp)
    showdisp(mHistory)
    updateDisp(pThrowDisp, './images/fist2.png')
    updateDisp(bThrowDisp, './images/fist.png')
    if (decision === "PLAYER-BATTING") {
        updateDisp(pRoleIcon, './images/batting.png')
        updateDisp(bRoleIcon, './images/bowling.png')
        updateruns("player")
    }
    else {
        updateDisp(bRoleIcon, './images/batting.png')
        updateDisp(pRoleIcon, './images/bowling.png')
        updateruns("bot")
    }
}

function updateruns(user) {
    if (user === "player") {
        for (let i = 0; i < moves.length; i++) {
            moves[i].icon.onclick = () => {
                throwButton.onclick = () => {
                    let botMove = createBotMove()
                    let pMove = (i+1)
                    addTile(botMove, pMove)
                    updateDisp(pThrowDisp, moves[i].img)
                    updateDisp(bThrowDisp, moves[botMove - 1].img)
                    hideDisp(tossCaption)
                    liveRuns.innerText = `${gameHistory.inn1.SCORE}`
                    if (botMove === pMove) {
                        lastTile.style.border = "2px solid red"
                        liveRuns.style.cssText = `
                            color: #e03131;
                        `
                        showdisp(tossCaption)
                        tossCaption.innerText = "YOURE OUT! READY FOR THE 2ND INNINGS?"
                        showdisp(startBtn2)
                        startBtn2.onclick = () => {
                            tossCaption.innerText = "LET THE THROWING BEGIN!"
                            liveRuns.innerText = "0"
                            hideDisp(startBtn2)
                            startinn2("BOT-BATTING")
                        }
                        return
                    }
                    else {
                        gameHistory.inn1.SCORE += pMove
                        liveRuns.innerText = `${gameHistory.inn1.SCORE}`
                    }
                }
            }
        }
    }
    else{
        for (let i = 0; i < moves.length; i++) {
            moves[i].icon.onclick = () => {
                throwButton.onclick = () => {
                    let botMove = createBotMove()
                    let pMove = (i+1)
                    addTile(botMove, pMove)
                    updateDisp(pThrowDisp, moves[i].img)
                    updateDisp(bThrowDisp, moves[botMove - 1].img)
                    hideDisp(tossCaption)
                    liveRuns.innerText = `${gameHistory.inn1.SCORE}`
                    if (botMove === pMove) {
                        lastTile.style.border = "2px solid red"
                        liveRuns.style.cssText = `
                            color: #e03131;
                        `
                        showdisp(tossCaption)
                        tossCaption.innerText = "BOTS OUT! READY FOR THE 2ND INNINGS?"
                        showdisp(startBtn2)
                        startBtn2.onclick = () => {
                            tossCaption.innerText = "LET THE THROWING BEGIN!"
                            liveRuns.innerText = "0"
                            hideDisp(startBtn2)
                            startinn2("PLAYER-BATTING")
                        }
                        return
                    }
                    else {
                        gameHistory.inn1.SCORE += botMove
                        liveRuns.innerText = `${gameHistory.inn1.SCORE}`
                    }
                }
            }
        }
    }
}


function startinn2(decision){
    hideDisp(startBtn2)
    updateDisp(pThrowDisp, './images/fist2.png')
    updateDisp(bThrowDisp, './images/fist.png')
    if (decision === "PLAYER-BATTING") {
        updateDisp(pRoleIcon, './images/batting.png')
        updateDisp(bRoleIcon, './images/bowling.png')
        updateruns2("player")
    }
    else {
        updateDisp(bRoleIcon, './images/batting.png')
        updateDisp(pRoleIcon, './images/bowling.png')
        updateruns2("bot")
    }
}

function updateruns2(user){
    showdisp(gameStats)
    gameHistory.inn2.TARGET = (gameHistory.inn1.SCORE + 1)
    console.log(gameHistory)
    liveRuns.style.color = "white"

        if (user === "player") {
        for (let i = 0; i < moves.length; i++) {
            moves[i].icon.onclick = () => {
                throwButton.onclick = () => {
                    let botMove = createBotMove()
                    let pMove = (i+1)
                    addTile(botMove, pMove)
                    updateDisp(pThrowDisp, moves[i].img)
                    updateDisp(bThrowDisp, moves[botMove - 1].img)
                    hideDisp(tossCaption)
                    liveRuns.innerText = `${gameHistory.inn2.SCORE}`
                    if (botMove === pMove) {
                        lastTile.style.border = "2px solid red"
                        liveRuns.style.cssText = `
                            color: #e03131;
                        `
                        if (botMove === pMove && gameHistory.inn2.runsLeft > 1){
                            gameHistory.winner = "BOT"
                            declareWinner("BOT")
                        }
                        if (botMove === pMove && gameHistory.inn2.runsLeft === 1){
                            gameHistory.winner = "TIE"
                            declareWinner("NONE")
                        }
                        return
                    }
                    else {
                       
                        gameHistory.inn2.SCORE += pMove
                        liveRuns.innerText = `${gameHistory.inn2.SCORE}`
                        gameHistory.inn2.runsLeft = gameHistory.inn2.TARGET - gameHistory.inn2.SCORE
                        gameStats.innerHTML = `
                            <h2 class="target">TARGET - ${gameHistory.inn2.TARGET}</h2>
                            <h2 class="runsLeft">RUNS LEFT - ${gameHistory.inn2.runsLeft}</h2>
                        `
                        if(gameHistory.inn2.runsLeft <= 0){
                            hideDisp(runsLeft)
                            gameHistory.winner = "PLAYER"
                            declareWinner("PLAYER")
                            return
                        }
                    }
                }
            }
        }
    }
    else{
        for (let i = 0; i < moves.length; i++) {
            moves[i].icon.onclick = () => {
                throwButton.onclick = () => {
                    let botMove = createBotMove()
                    let pMove = (i+1)
                    addTile(botMove, pMove)
                    updateDisp(pThrowDisp, moves[i].img)
                    updateDisp(bThrowDisp, moves[botMove - 1].img)
                    hideDisp(tossCaption)
                    liveRuns.innerText = `${gameHistory.inn2.SCORE}`
                    if (botMove === pMove) {
                        lastTile.style.border = "2px solid red"
                        liveRuns.style.cssText = `
                            color: #e03131;
                        `
                        if (botMove === pMove && gameHistory.inn2.runsLeft > 1){
                            gameHistory.winner = "PLAYER"
                            declareWinner("PLAYER")
                            return
                        }
                        if (botMove === pMove && gameHistory.inn2.runsLeft === 1){
                            gameHistory.winner = "TIE"
                            declareWinner("NONE")
                            return
                        }

                        return
                    }
                    else {
                        gameHistory.inn2.SCORE += botMove
                        liveRuns.innerText = `${gameHistory.inn2.SCORE}`
                        gameStats.innerHTML = `
                            <h2 class="target">TARGET - ${gameHistory.inn2.TARGET}</h2>
                            <h2 class="runsLeft">RUNS LEFT - ${gameHistory.inn2.runsLeft}</h2>
                        `
                        gameHistory.inn2.runsLeft = gameHistory.inn2.TARGET - gameHistory.inn2.SCORE
                        if(gameHistory.inn2.runsLeft <= 0){
                            hideDisp(runsLeft)
                            gameHistory.winner = "BOT"
                            declareWinner("PLAYER")
                            return
                        }

                    }
                }
            }
        }
    }

}

function declareWinner(user){
    showdisp(tossCaption)
    hideDisp(moveSection)
    batButton.remove()
    bowlButton.remove()
    
    if(user === "PLAYER"){
        tossCaption.innerText = "CONGRATULATIONS YOUVE WON!"
        return
    }
    if (user === "BOT") {
        tossCaption.innerText = "YOUVE LOST! THE BOT WINS. :("
        return
    }
    if  (user === "NONE"){
        tossCaption.innerText = "ITS A TIE! OMG WHAT A MATCH"
        return
    }
}