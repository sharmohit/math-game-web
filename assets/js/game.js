let currentLevel = 0
let correctRow = -1
let answer = 0

const onKeyDown = (e) => {
    if (e.keyCode == 38) {
        console.log("Up Key")
    } else if (e.keyCode == 40) {
        console.log("Down Key")
    } else if (e.keyCode == 32) {
        console.log("Space Key")
    }
}

/**
* Event Listeners
*/
document.querySelector("body").addEventListener("keydown", onKeyDown)

const getFirstRandomNumber = () => {
    return Math.floor(Math.random() * 15) + 1
}

const getSecondRandomNumber = () => {
    return Math.floor(Math.random() * 10) + 1
}

const setupZombies = () => {
    const zombies = document.querySelectorAll(".zombie")
    const randomZombieIndex = Math.floor(Math.random() * zombies.length)
    for (let i = 0; i < zombies.length; i++) {
        const firstNumber = getFirstRandomNumber()
        const secondNumber = getSecondRandomNumber()
        zombies[i].querySelector("p").innerText = `${firstNumber}x${secondNumber}=?`
        if (i === randomZombieIndex) {
            correctRow = i
            answer = firstNumber * secondNumber
        }
    }
}

const setupPlayers = () => {
    const players = document.querySelectorAll(".player")
    const randomPlayerIndex = Math.floor(Math.random() * players.length)
    for (let i = 0; i < players.length; i++) {
        players[i].style.visibility = "hidden"
        players[i].querySelector("p").innerText = answer
        if (i === randomPlayerIndex) {
            players[i].style.visibility = "visible"
        }
    }
}

const init = () => {
    setupZombies()
    setupPlayers()
}

init()