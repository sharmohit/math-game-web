//#region Constants
const MAX_LEVEL = 5
const MAX_SPEED = 11
const MIN_SPEED = 22
const MAX_FIRST_NUM = 15
const MAX_SECOND_NUM = 10
const MAX_GAME_TIME = 60
const MAX_HIGH_SCORE_LENGTH = 5
const SCREEN_WIDTH_OFFSET = 0.06
const HIGH_SCORE_KEY = "math-game-highscore"
const AUDIO_KEY = "math-game-audio"
//#endregion

//#region Variables
let backgroundMusic
let screenEnd
let currentLevel
let correctRow
let answer
let gameOverAudio
let remainingTime = MAX_GAME_TIME
let timerInterval
let canPlayAudio
let hasUserClicked = false
let player = null
let questionGenerator = null
let questionList = []
let zombieList = []
let zombieRandomImageIndexList = []
const playerName = location.search.slice(location.search.indexOf("=") + 1, location.search.length).replaceAll("+", " ")
//#endregion

//#region Query Selectors
const levelContainer = document.querySelector("#level-container")
const playerElements = document.querySelectorAll(".player")
const zombieElements = document.querySelectorAll(".zombie")
const resultUI = document.querySelector("#result")
let remainingTimeText = document.getElementById("remaining-time")
let currentLevelText = document.getElementById("level-hud")
//#endregion

//#region Classes
class Player {
    constructor(name, elements) {
        this.moveIndex
        this.name = name
        this.elements = elements
    }

    setup = () => {
        const randomPlayerIndex = Math.floor(Math.random() * this.elements.length)
        for (let i = 0; i < this.elements.length; i++) {
            this.elements[i].classList.add("hidden")
            this.elements[i].classList.remove("row-item")
            this.elements[i].querySelector("p").innerText = answer
            if (i === randomPlayerIndex) {
                this.elements[i].classList.remove("hidden")
                this.elements[i].classList.add("row-item")
                this.moveIndex = i
            }
        }
    }

    updateAnswer = () => {
        for (let i = 0; i < this.elements.length; i++) {
            this.elements[i].querySelector("p").innerText = answer
        }
    }

    moveUp = () => {
        if (this.moveIndex === 0) {
            return
        }
    
        this.elements[this.moveIndex].classList.add("hidden")
        this.elements[this.moveIndex].classList.remove("row-item")
        this.moveIndex--
        this.elements[this.moveIndex].classList.remove("hidden")
        this.elements[this.moveIndex].classList.add("row-item")
    }

    moveDown = () => {
        if (this.moveIndex === this.elements.length - 1) {
            return
        }
    
        this.elements[this.moveIndex].classList.add("hidden")
        this.elements[this.moveIndex].classList.remove("row-item")
        this.moveIndex++
        this.elements[this.moveIndex].classList.remove("hidden")
        this.elements[this.moveIndex].classList.add("row-item")
    }
}

class Zombie {
    constructor(index, element){
        this.moveInterval = null
        this.index = index
        this.element = element
    }

    setup = (randomQuestion, currentLevel) => {
        this.updateQuestion(randomQuestion)

        const getUniqueImageIndex = (randomIndex) => {
            let hasImageIndex = false
            for (let i = 0; i < zombieRandomImageIndexList.length; i++) {
                if (randomIndex === zombieRandomImageIndexList[i]) {
                    hasImageIndex = true
                    break
                }
            }

            if (hasImageIndex) {
                return getUniqueImageIndex(Math.floor(Math.random() * zombieList.length) + 1)
            } else {
                zombieRandomImageIndexList.push(randomIndex)
                return randomIndex
            }
        }

        let randomImageIndex = Math.floor(Math.random() * zombieList.length) + 1
        this.element.querySelector("img").src = `assets/img/level-${currentLevel}/zombie-${getUniqueImageIndex(randomImageIndex)}.png`

        const moveZombie = () => {
            if (pos === screenEnd) {
                this.stopMove()
                gameOver(false)
            } else {
                pos++
                this.element.style.transform = `translateX(${pos}px)`
            }
        }

        let pos = this.element.style.left
        let randSpeed = Math.floor(Math.random() * (MAX_SPEED - MIN_SPEED) + MIN_SPEED)
        this.moveInterval = setInterval(moveZombie, randSpeed)
    }

    updateQuestion = (question) => {
        this.element.querySelector("p").innerText = `${question.firstNumber}x${question.secondNumber}=?`
    }

    stopMove = () => {
        clearInterval(this.moveInterval)
    }
}

class Question {
    constructor(firstNumber, secondNumber) {
        this.firstNumber = firstNumber
        this.secondNumber = secondNumber
        this.answer = firstNumber * secondNumber
    }

    isEqual = (secondQuestion) => {
        return (this.answer === secondQuestion.answer)
    }
}

class QuestionGenerator {
    constructor(firstNumMax, secondNumMax) {
        this.firstNumMax = firstNumMax
        this.secondNumMax = secondNumMax
    }

    createRandomQuestion = () => {
        return new Question((Math.floor(Math.random() * this.firstNumMax) + 1),
        (Math.floor(Math.random() * this.secondNumMax) + 1))
    }
}

class HighScore {
    constructor(playerName, currentLevel) {
        this.playerName = playerName
        this.level = currentLevel
    }
}
//#endregion

//#region Questions Generation
const addUniqueQuestion = (randomQuestion) => {
    let isExist = false
    for (let i = 0; i < questionList.length; i++) {
        if (randomQuestion.isEqual(questionList[i])) {
            isExist = true
            break
        }
    }

    if (!isExist) {
        questionList.push(randomQuestion)
    } else {
        addUniqueQuestion(questionGenerator.createRandomQuestion())
    }
}

const getRandomZombieIndex = () => {
    const randomZombieIndex = Math.floor(Math.random() * zombieList.length)

    if (randomZombieIndex === player.moveIndex) {
        getRandomZombieIndex()
    } else {
        return randomZombieIndex
    }
}

const regenerateQuestions = () => {
    const randomZombieIndex = getRandomZombieIndex()
    questionList.length = 0
    for (let i = 0; i < zombieList.length; i++) {
        let randomQuestion = questionGenerator.createRandomQuestion()

        if (questionList.length === 0) {
            questionList.push(randomQuestion)
        } else {
            addUniqueQuestion(randomQuestion)
        }

        zombieList[i].updateQuestion(questionList[i])

        if (i === randomZombieIndex) {
            correctRow = i
            answer = questionList[i].answer
        }
    }
    player.updateAnswer()
}
//#endregion

//#region Level Setup
const createZombies = () => {
    for (let i = 0; i < zombieElements.length; i++) {
        let zombie = new Zombie(i, zombieElements[i])
        zombieList.push(zombie)
    }
}

const setupZombies = () => {
    const randomZombieIndex = getRandomZombieIndex()
    questionList.length = 0
    zombieRandomImageIndexList.length = 0
    for (let i = 0; i < zombieList.length; i++) {
        zombieList[i].stopMove()
        let randomQuestion = questionGenerator.createRandomQuestion()

        if (questionList.length === 0) {
            questionList.push(randomQuestion)
        } else {
            addUniqueQuestion(randomQuestion)
        }

        zombieList[i].setup(questionList[i], currentLevel)

        if (i === randomZombieIndex) {
            correctRow = i
            answer = questionList[i].answer
        }
    }
}

const setupLevel = () => {
    document.querySelector("#level-container").style.backgroundImage = `url('./assets/img/level-${currentLevel}/background.jpg')`
    currentLevelText.innerText = `Level ${currentLevel}/${MAX_LEVEL}`
    setupZombies()
    player.setup()
}
//#endregion

//#region Game Win/Lose Conditions
const updateRemainingTime = () => {
    remainingTime-- 
    remainingTimeText.innerText = remainingTime

    if (remainingTime == 0) {
        gameOver(false)
    }
}

const checkAnswer = () => {
    if (correctRow === player.moveIndex) {
        nextLevel()
    } else {
        regenerateQuestions()
    }
}

const nextLevel = () => {
    if (currentLevel < MAX_LEVEL){
        currentLevel++
        setupLevel()
    } else {
        gameOver(true)
    }
}
//#endregion

//#region Save/Load
const getHighScore = () => {
    if (HIGH_SCORE_KEY in localStorage) {
        return JSON.parse(localStorage.getItem(HIGH_SCORE_KEY));
    } else {
        return null
    }
}

const moveHighScore = (highScoreList, startIndex, finalIndex) => {
    let highScore = highScoreList[startIndex]
    for (let i = startIndex - 1; i >= finalIndex; i--) {
        highScoreList[i + 1] = highScoreList[i]
    }
    highScoreList[finalIndex] = highScore
}

const updateHighScore = () => {
    let highScoreList = getHighScore()

    if (highScoreList === null) {
        highScoreList = []
        highScoreList.push(new HighScore(player.name, currentLevel))
        localStorage.setItem(HIGH_SCORE_KEY, JSON.stringify(highScoreList))
    } else {
        let highScoreLength = highScoreList.length

        let playerRankIndex = -1
        const checkPlayerExist = (highScore, index) => {
            if (player.name === highScore.playerName) {
                playerRankIndex = index
                return true
            }
            return false
        }

        if (highScoreList.some(checkPlayerExist)) {
            if (playerRankIndex > 0) {
                if (currentLevel >= highScoreList[playerRankIndex].level) {
                    highScoreList[playerRankIndex].level = currentLevel
                    for (let i = 0; i < playerRankIndex; i++ ) {
                        if (currentLevel >= highScoreList[i].level) {
                            moveHighScore(highScoreList, playerRankIndex, i)
                            break
                        }
                    }
                    localStorage.setItem(HIGH_SCORE_KEY, JSON.stringify(highScoreList))
                }
            } else if (playerRankIndex == 0) {
                if (currentLevel > highScoreList[playerRankIndex].level) {
                    highScoreList[playerRankIndex].level = currentLevel
                    localStorage.setItem(HIGH_SCORE_KEY, JSON.stringify(highScoreList))
                }
            }
        } else {
            if (highScoreLength < 5) {
                highScoreList.push(new HighScore(player.name, currentLevel))
                highScoreLength = highScoreList.length

                for (let i = 0; i < highScoreLength; i++ ) {
                    if (currentLevel >= highScoreList[i].level) {
                        moveHighScore(highScoreList, highScoreLength - 1, i)
                        break
                    } else {
                    }
                }
            } else {
                for (let i = 0; i < highScoreLength; i++ ) {
                    if (currentLevel >= highScoreList[i].level) {
                        highScoreList.splice(i, 0, new HighScore(player.name, currentLevel))
                        highScoreLength = highScoreList.length
                        break
                    }
                }
            }

            if (highScoreLength > 5) {
                highScoreList.splice(MAX_HIGH_SCORE_LENGTH, highScoreLength)
            }

            localStorage.setItem(HIGH_SCORE_KEY, JSON.stringify(highScoreList))
        }
    }
}

const getAudioPreference = () => {
    if (AUDIO_KEY in localStorage) {
        return localStorage.getItem(AUDIO_KEY);
    } else {
        return false
    }
}
//#endregion

const gameOver = (isWon) => {
    backgroundMusic.pause()
    for (let i = 0; i < zombieList.length; i++) {
        zombieList[i].stopMove()
    }

    if (isWon) {
        document.getElementById("game-over-text").innerText = "YOU WON"
        gameOverAudio = new Audio("assets/audio/complete.ogg")
    } else {
        document.getElementById("game-over-text").innerText = "YOU LOSE"
        gameOverAudio = new Audio("assets/audio/lose.ogg")
    }

    if (canPlayAudio === true) {
        gameOverAudio.play()
    }
    resultUI.classList.remove("hidden")
    clearInterval(timerInterval)
    window.removeEventListener("keydown", onKeyDown)
    updateHighScore()
}

const init = () => {
    backgroundMusic = new Audio(`assets/audio/music-level-${Math.floor(Math.random() * MAX_LEVEL) + 1}.ogg`)
    backgroundMusic.loop = true
    if (hasUserClicked && (canPlayAudio === true)) {
        backgroundMusic.play()
    }
    window.addEventListener("keydown", onKeyDown)
    screenEnd = visualViewport.width - Math.floor(visualViewport.width * SCREEN_WIDTH_OFFSET)
    currentLevel = 1
    correctRow = -1
    answer = 0
    remainingTime = MAX_GAME_TIME
    remainingTimeText.innerText = remainingTime
    clearInterval(timerInterval)
    timerInterval = setInterval(updateRemainingTime, 1000)
}

const main = () => {
    if (playerName === "") {
        window.location.replace("index.html")
        return
    }
    canPlayAudio = getAudioPreference()
    questionGenerator = new QuestionGenerator(MAX_FIRST_NUM, MAX_SECOND_NUM)
    player = new Player(playerName, playerElements)
    init()
    createZombies()
    setupLevel()
}

//#region Callbacks Functions
const onKeyDown = (e) => {
    if (e.keyCode == 38) {
        player.moveUp()
    } else if (e.keyCode == 40) {
        player.moveDown()
    } else if (e.keyCode == 32) {
        checkAnswer()
    }
}

const onWindowResize = () => {
    screenEnd = visualViewport.width - Math.floor(visualViewport.width * SCREEN_WIDTH_OFFSET)
}

const onPlayAgain = () => {
    gameOverAudio.pause()
    resultUI.classList.add("hidden")
    init()
    setupLevel()
}

const onWindowClick = () => {
    hasUserClicked = true
    if (canPlayAudio === true) {
        backgroundMusic.play()
    }
    window.removeEventListener("click", onWindowClick)
}

const playBackgroundMusic = () => {
    hasUserClicked = true
    if (canPlayAudio === true) {
        backgroundMusic.play()
    }
    window.removeEventListener("keydown", playBackgroundMusic)
}
//#endregion

//#region Event Listeners
window.addEventListener("load", main)
window.addEventListener("resize", onWindowResize)
window.addEventListener("click", onWindowClick)
window.addEventListener("keydown", playBackgroundMusic)
document.getElementById("play-again-btn").addEventListener("click", onPlayAgain)
//#endregion