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


for (let i = 0; i < moves.length; i++) {
    moves[i].icon.onclick = () => {
        let botMove = createBotMove()
        throwButton.onclick = () => {
            mtile.remove()
            const mBox = document.createElement('div')
            mBox.className = "moveHist-Tile"
            mBox.innerHTML = `
            <div class="botMove">
                <div class="bot-icon"></div>
                <p class="bot-moveNumber">${botMove}</p>
            </div>
            <div class="playerMove">
                <div class="player-icon"></div>
                <p class="player-moveNumber">${moves[i].value}</p>
            </div>
        `;
            mHistory.appendChild(mBox);

            mHistory.scrollTop = mHistory.scrollHeight;


            pThrowDisp.style.cssText = `
            background-image: url(${moves[i].img})
        `;

            bThrowDisp.style.cssText = `
            background-image: url(${moves[botMove - 1].img})
        `;
        }


    }
}


function createBotMove() {
    let botMove = Math.ceil(Math.random() * 6)
    return botMove
}




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
    alert("GAME PAUSED! -_-")
}

continueBtn.onclick = () => {
    hideDisp(continueBtn)
    showdisp(pauseBtn)
    alert("GAME CONITNUED! ^_^")
    cursorOn(tossDiv)
    cursorOn(headsBtn)
    cursorOn(tailsBtn)
}

function showdisp(element){
    element.classList.remove("hidden");
}
function hideDisp(element){
    element.classList.add("hidden");
}

function cursorBan(element){
    element.style.cursor = "not-allowed"
}
function cursorOn(element){
    element.style.cursor = "pointer"
}


const mtile = document.querySelector(".goneJS")
const mHistory = document.querySelector(".moveHistory")

const pThrowDisp = document.querySelector(".PlayerThrowDisp")
const bThrowDisp = document.querySelector(".BotThrowDisp")

const throwButton = document.querySelector(".moveButton")

const tossDiv = document.querySelector(".tossDiv")