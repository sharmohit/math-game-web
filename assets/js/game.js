let currentLevel = 0
let correctRow = -1
let answer = 0
let moveIndex = -1
let remainingTime = 60

let players = document.querySelectorAll(".player")
let remainingTimeText = document.querySelector("#remaining-time")
let timerInterval

const zombieCount = document.querySelectorAll(".row-item").length - 1

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
    const randomPlayerIndex = Math.floor(Math.random() * players.length)
    for (let i = 0; i < players.length; i++) {
        players[i].style.visibility = "hidden"
        players[i].querySelector("p").innerText = answer
        if (i === randomPlayerIndex) {
            players[i].style.visibility = "visible"
            moveIndex = i
        }
    }
}

const movePlayerUp = () => {
    if (moveIndex === 0) {
        return
    }

    players[moveIndex].style.visibility = "hidden"
    moveIndex--
    players[moveIndex].style.visibility = "visible"

}

const movePlayerDown = () => {
    if (moveIndex === players.length - 1) {
        return
    }

    players[moveIndex].style.visibility = "hidden"
    moveIndex++
    moveIndex %= zombieCount
    players[moveIndex].style.visibility = "visible"
}

const updateRemainingTime = () => {
    remainingTime-- 
    remainingTimeText.innerText = remainingTime

    if (remainingTime == 0) {
        alert("Game Over")
        clearInterval(timerInterval)
    }
}

const main = () => {
    setupZombies()
    setupPlayers()

    timerInterval = setInterval(updateRemainingTime, 1000)
}


const onKeyDown = (e) => {
    if (e.keyCode == 38) {
        movePlayerUp()
    } else if (e.keyCode == 40) {
        movePlayerDown()
    } else if (e.keyCode == 32) {
        console.log("Space Key")
    }
}

/**
* Event Listeners
*/
window.addEventListener("load", main)
document.querySelector("body").addEventListener("keydown", onKeyDown)