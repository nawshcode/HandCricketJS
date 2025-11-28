const moves = [
    {
        icon: document.querySelector(".moveOne"),
        value: 1,
        img: "./images/one.png"
    },
    {
        icon: document.querySelector(".moveTwo"),
        value: 2,
        img: "./images/two.png"
    },
    {
        icon: document.querySelector(".moveThree"),
        value: 3,
        img: "./images/three.png"
    },
    {
        icon: document.querySelector(".moveFour"),
        value: 4,
        img: "./images/four.png"
    },
    {
        icon: document.querySelector(".moveFive"),
        value: 5,
        img: "./images/five.png"

    },
    {
        icon: document.querySelector(".moveSix"),
        value: 6,
        img: "./images/six.png"

    }
]


const startBtn = document.querySelector(".Start")
const pauseBtn = document.querySelector(".Pause")
const continueBtn = document.querySelector(".Continue")
const exitBtn = document.querySelector(".Exit")

const headsBtn = document.querySelector(".headsButton")
const tailsBtn = document.querySelector(".tailsButton")

const mtile = document.querySelector(".goneJS")
const mHistory = document.querySelector(".moveHistory")

const pThrowDisp = document.querySelector(".PlayerThrowDisp")
const bThrowDisp = document.querySelector(".BotThrowDisp")

const throwButton = document.querySelector(".moveButton")

const tossDiv = document.querySelector(".tossDiv")
const tossCaption = document.querySelector(".tossCaption")

const moveSection = document.querySelector(".moveSec")
const gameSection = document.querySelector(".gameSec")

const headStart = document.querySelector(".headStart")



startBtn.onclick = () => {
    hideDisp(startBtn)
    showdisp(tossDiv)
    showdisp(pauseBtn)
    showdisp(exitBtn)
    alert("GAME STARTS! ^_^")
}

pauseBtn.onclick = () => {
    hideDisp(pauseBtn)
    showdisp(continueBtn)
    cursorBan(tossDiv)
    cursorBan(headsBtn)
    cursorBan(tailsBtn)
    cursorBan(gameSection)
    cursorBan(moveSection)
    cursorBan(throwButton)
    alert("GAME PAUSED! -_-")
}

continueBtn.onclick = () => {
    hideDisp(continueBtn)
    showdisp(pauseBtn)
    alert("GAME CONITNUED! ^_^")
    cursorOn(tossDiv)
    cursorOn(headsBtn)
    cursorOn(tailsBtn)
    cursorOn(gameSection)
    cursorOn(moveSection)
    cursorOn(throwButton)
}

function showdisp(element) {
    element.classList.remove("hidden");
}
function hideDisp(element) {
    element.classList.add("hidden");
}

function cursorBan(element) {
    element.style.cursor = "not-allowed"
}
function cursorOn(element) {
    element.style.cursor = "pointer"
}
function createBotMove() {
    let botMove = Math.ceil(Math.random() * 6)
    return botMove
}

const HEADS = {
    element: document.querySelector(".headsButton"),
    value: "HEADS"
}
const TAILS = {
    element: document.querySelector(".tailsButton"),
    value: "TAILS"
}

let TossChoice = "";


HEADS.element.onclick = () => {
    TossChoice += HEADS.value
    hideDisp(tailsBtn)
    hideDisp(headsBtn)
    console.log(TossChoice)
    tossCaption.innerText = `You Chose HEADS! Throw Your Move!`
    showdisp(moveSection)
    showdisp(gameSection)
    headStart.style.cssText = `
        grid-area: 1 / 1 / 2 / 2;
        display: flex;
        flex-direction: column;
        padding: 20px;
        justify-content: space-around;
        box-shadow: none;
    `
    tossCaption.style.cssText = `
        margin: auto;
        color: #a5d8ff;
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        margin-bottom: 5px;
    `
    gameSection.style.cssText = `
        box-shadow: 0px 0px 10px 2px rgb(81, 75, 75);
    `
    startToss()

}

TAILS.element.onclick = () => {
    TossChoice += TAILS.value
    hideDisp(tailsBtn)
    hideDisp(headsBtn)
    console.log(TossChoice)
    tossCaption.innerText = `You Chose TAILS! Throw Your Move!`
    showdisp(moveSection)
    showdisp(gameSection)
    headStart.style.cssText = `
        grid-area: 1 / 1 / 2 / 2;
        display: flex;
        flex-direction: column;
        padding: 20px;
        justify-content: space-around;
        box-shadow: none;
    `
    tossCaption.style.cssText = `
        margin: auto;
        color: #a5d8ff;
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        margin-bottom: 5px;
    `
    gameSection.style.cssText = `
        box-shadow: 0px 0px 10px 2px rgb(81, 75, 75);
    `
}


/*
function notePmove(){
    for (let i = 0; i < moves.length; i++){
        moves[i].icon.onclick = () => {
            throwButton.onclick = () => {
                console.log(moves[i].value) 
            }
        }
    }
}

*/



for (let i = 0; i < moves.length; i++) {
    moves[i].icon.onclick = () => {

        let botMove = createBotMove()

        throwButton.onclick = () => {

            addTile(botMove, i)  // adding tiles as the moves are made

            //updating display for player and bot throws on the big box
            updateDisp(pThrowDisp, moves[i].img)
            updateDisp(bThrowDisp, moves[botMove - 1].img)

        }


    }
}




function addTile(a,b){
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
        <p class="player-moveNumber">${moves[b].value}</p>
    </div>`;
    mHistory.appendChild(mBox);
    mHistory.scrollTop = mHistory.scrollHeight;
}

function updateDisp(element, image){
    element.style.cssText = `
            background-image: url(${image})
        `
}

