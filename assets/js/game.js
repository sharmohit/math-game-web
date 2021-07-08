const MAX_LEVEL = 5
let currentLevel = 1
let correctRow = -1
let answer = 0
let moveIndex = -1
let remainingTime = 60

let players = document.querySelectorAll(".player")
let remainingTimeText = document.querySelector("#remaining-time")
let currentLevelText = document.querySelector("#hud-items > p")
let resultUI = document.querySelector(".result > h1")
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
        zombies[i].querySelector("img").src = `assets/img/level-${currentLevel}/zombie-${i + 1}.png`
        if (i === randomZombieIndex) {
            correctRow = i
            answer = firstNumber * secondNumber
        }
    }
}

const setupPlayers = () => {
    const randomPlayerIndex = Math.floor(Math.random() * players.length)
    for (let i = 0; i < players.length; i++) {
        players[i].classList.add("hidden")
        players[i].querySelector("p").innerText = answer
        if (i === randomPlayerIndex) {
            players[i].classList.remove("hidden")
            moveIndex = i
        }
    }
}

const movePlayerUp = () => {
    if (moveIndex === 0) {
        return
    }

    players[moveIndex].classList.add("hidden")
    moveIndex--
    players[moveIndex].classList.remove("hidden")

}

const movePlayerDown = () => {
    if (moveIndex === players.length - 1) {
        return
    }

    players[moveIndex].classList.add("hidden")
    moveIndex++
    moveIndex %= zombieCount
    players[moveIndex].classList.remove("hidden")
}

const updateRemainingTime = () => {
    remainingTime-- 
    remainingTimeText.innerText = remainingTime

    if (remainingTime == 0) {
        resultUI.innerText = "Game Over"
        resultUI.classList.remove("hidden")
        clearInterval(timerInterval)
    }
}

const checkAnswer = () => {
    if (correctRow === moveIndex) {
        nextLevel()
    }
}

const nextLevel = () => {
    if (currentLevel < MAX_LEVEL){
        currentLevel++
        setupLevel()
    } else {
        resultUI.innerText = "You Won"
        resultUI.classList.remove("hidden")
        clearInterval(timerInterval)
        document.querySelector("body").removeEventListener("keydown", onKeyDown)
    }
}

const setupLevel = () => {
    document.querySelector("#level-container").style.backgroundImage = `url('/assets/img/level-${currentLevel}/background.jpg')`
    currentLevelText.innerText = `Level ${currentLevel}/${MAX_LEVEL}`
    setupZombies()
    setupPlayers()
}

const main = () => {
    setupLevel()
    timerInterval = setInterval(updateRemainingTime, 1000)
}

const onKeyDown = (e) => {
    if (e.keyCode == 38) {
        movePlayerUp()
    } else if (e.keyCode == 40) {
        movePlayerDown()
    } else if (e.keyCode == 32) {
        checkAnswer()
    }
}

window.addEventListener("load", main)
document.querySelector("body").addEventListener("keydown", onKeyDown)