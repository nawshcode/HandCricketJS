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

for (let i = 0; i < moves.length; i++) {
    moves[i].icon.onclick = () => {
        mtile.remove()
        const mBox = document.createElement('div');
        mBox.className = "moveHist-Tile";
        mBox.innerHTML = `
            <div class="botMove">
                <div class="bot-icon"></div>
                <p class="bot-moveNumber">0</p>
            </div>
            <div class="playerMove">
                <div class="player-icon"></div>
                <p class="player-moveNumber">${moves[i].value}</p>
            </div>
        `;
        mHistory.appendChild(mBox);

        mHistory.scrollTop = mHistory.scrollHeight;
    }
}



const mtile = document.querySelector(".goneJS")
const mHistory = document.querySelector(".moveHistory")