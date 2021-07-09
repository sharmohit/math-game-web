const MAX_LEVEL = 5
const MAX_SPEED = 11
const MIN_SPEED = 22
const MAX_FIRST_NUM = 15
const MAX_SECOND_NUM = 10
const MAX_GAME_TIME = 60

let currentLevel = 1
let correctRow = -1
let answer = 0
let remainingTime = MAX_GAME_TIME

const playerElements = document.querySelectorAll(".player")
const zombieElements = document.querySelectorAll(".zombie")

let remainingTimeText = document.querySelector("#remaining-time")
let currentLevelText = document.querySelector("#hud-items > p")
let resultUI = document.querySelector(".result > h1")
let timerInterval

let player = null
let questionGenerator = null
let questionList = new Array()
let zombieList = new Array()

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
            this.elements[i].querySelector("p").innerText = answer
            if (i === randomPlayerIndex) {
                this.elements[i].classList.remove("hidden")
                this.moveIndex = i
            }
        }
    }

    moveUp = () => {
        if (this.moveIndex === 0) {
            return
        }
    
        this.elements[this.moveIndex].classList.add("hidden")
        this.moveIndex--
        this.elements[this.moveIndex].classList.remove("hidden")
    }

    moveDown = () => {
        if (this.moveIndex === this.elements.length - 1) {
            return
        }
    
        this.elements[this.moveIndex].classList.add("hidden")
        this.moveIndex++
        this.elements[this.moveIndex].classList.remove("hidden")
    }
}

class Zombie {
    constructor(index, element){
        this.moveInterval = null
        this.index = index
        this.element = element
    }

    setup = (randomQuestion, currentLevel) => {
        this.element.querySelector("p").innerText = `${randomQuestion.firstNumber}x${randomQuestion.secondNumber}=${randomQuestion.answer}`
        this.element.querySelector("img").src = `assets/img/level-${currentLevel}/zombie-${this.index + 1}.png`

        const moveZombie = () => {
            if (pos === visualViewport.width - visualViewport.width * 0.10) {
                console.log("end reached " + pos)
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

const addUniqueQuestion = (randomQuestion) => {
    let isExist = false
    for (let i = 0; i < questionList.length; i++) {
        if (randomQuestion.isEqual(questionList[i])) {
            isExist = true
        } else {
            isExist = false
        }
    }

    if (!isExist) {
        questionList.push(randomQuestion)
    } else {
        addUniqueQuestion(questionGenerator.createRandomQuestion())
    }
}

const setupZombies = () => {
    const randomZombieIndex = Math.floor(Math.random() * zombieList.length)
    questionList.length = 0
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

const setupLevel = () => {
    document.querySelector("#level-container").style.backgroundImage = `url('/assets/img/level-${currentLevel}/background.jpg')`
    currentLevelText.innerText = `Level ${currentLevel}/${MAX_LEVEL}`
    setupZombies()
    player.setup()
}

const createZombies = () => {
    for (let i = 0; i < zombieElements.length; i++) {
        let zombie = new Zombie(i, zombieElements[i])
        zombieList.push(zombie)
    }
}

const gameOver = (isWon) => {
    for (let i = 0; i < zombieList.length; i++) {
        zombieList[i].stopMove()
    }

    if (isWon) {
        resultUI.innerText = "You Won"
    } else {
        resultUI.innerText = "Game Over"
    }

    resultUI.classList.remove("hidden")
    clearInterval(timerInterval)
    document.querySelector("body").removeEventListener("keydown", onKeyDown)
}

const main = () => {
    questionGenerator = new QuestionGenerator(MAX_FIRST_NUM, MAX_SECOND_NUM)
    player = new Player("Dummy", playerElements)
    createZombies()
    setupLevel()
    timerInterval = setInterval(updateRemainingTime, 1000)
}

const onKeyDown = (e) => {
    if (e.keyCode == 38) {
        player.moveUp()
    } else if (e.keyCode == 40) {
        player.moveDown()
    } else if (e.keyCode == 32) {
        checkAnswer()
    }
}

window.addEventListener("load", main)
document.querySelector("body").addEventListener("keydown", onKeyDown)