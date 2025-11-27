

const one = document.querySelector(".moveOne")
const two = document.querySelector(".moveTwo")
const three = document.querySelector(".moveThree")
const four = document.querySelector(".moveFour")
const five = document.querySelector(".moveFive")
const six = document.querySelector(".moveSix")

const throwButton = document.querySelector(".moveButton")

const tossDiv = document.querySelector(".tossDiv")


const start = document.querySelector(".Start")
start.onclick = () => {
    start.style.color = "white";
    start.style.backgroundColor ="grey";
    tossDiv.classList.remove("hidden");
    alert("GAME STARTS! ^_^");
}




