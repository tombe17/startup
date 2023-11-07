import { WORDS } from "./words.js";

const NUMBER_OF_GUESSES = 6;
let guessesLeft = NUMBER_OF_GUESSES;
let currentGuess = [];
let nextLetter = 0;
let rightGuessString = WORDS[Math.floor(Math.random() * WORDS.length)]
console.log(rightGuessString)

makeBoard()

function makeBoard() {
    //List name
    const nameEl = document.querySelector('#user-name');
    if (localStorage.getItem('userName') != undefined) {
        nameEl.textContent = localStorage.getItem('userName');
    } else {
        console.log("name is undefined")
        nameEl.textContent = "Mystery Player"
    }

    let board = document.getElementById("game-board")

    for (let i = 0; i < NUMBER_OF_GUESSES; i++) {
        let row = document.createElement("div")
        row.className = "letter-row"

        for (let j = 0; j < 5; j++) {
            let square = document.createElement("div")
            square.className = "square"
            row.appendChild(square)
        }
        board.appendChild(row)
    }
}

document.getElementById("keyboard").addEventListener("click", (e) => {
    const target = e.target

    if (!target.classList.contains("keyboard-btn")) {
        return
    }
    let key = target.textContent
    console.log(key)

    if (key === "DEL") {
        key = "Backspace"
    }

    if (key === "ENTER") {
        key = "Enter"
    }

    document.dispatchEvent(new KeyboardEvent("keyup", {'key': key}))
})

//Inserting letters
document.addEventListener("keyup", (e) => {
    if(guessesLeft === 0) {
        return;
    }

    let pressedKey = String(e.key);
    if (pressedKey === "Backspace" && nextLetter !== 0) {
        deleteLetter()
        return
    }

    if (pressedKey === "Enter") {
        checkGuess()
        return
    }

    if (pressedKey.length > 1) {
        return
    }

    let found = pressedKey.match(/[a-z]/gi)
    if (!found || found.length > 1) {
        return
    } else {
        insertLetter(pressedKey)
    }
})

function deleteLetter() {
    let row = document.getElementsByClassName("letter-row")[6 - guessesLeft]
    let box = row.children[nextLetter - 1]
    box.textContent = ""

    box.classList.remove("filled-box")
    currentGuess.pop()
    nextLetter -=1
    console.log(currentGuess)
}

function checkGuess() {
    let row = document.getElementsByClassName("letter-row")[6 - guessesLeft]
    let guessString = ''
    let rightGuess = Array.from(rightGuessString)

    for (const val of currentGuess) {
        guessString += val
    }

    if (guessString.length != 5) {
        alert("Not enough letters")
        return
    }

    if (!WORDS.includes(guessString)) {
        alert("Not in list")
        return
    }

    for (let i = 0; i < 5; i++) {
        let letterColor = ''
        let box = row.children[i]
        let letter = currentGuess[i]

        let letterPosition = rightGuess.indexOf(currentGuess[i])
        //is letter in the correct guess
        if (letterPosition === -1) {
            letterColor = 'rgb(83, 87, 91)'  //gray

        } else {
            //we know it is in the word
            //if letter index = right guess index then in position
            if(currentGuess[i] === rightGuess[i]) {
                letterColor = 'rgb(165, 237, 165)'  //green
            } else {
                letterColor = 'rgb(241, 241, 139)'  //yellow
            }

            rightGuess[letterPosition] = "#"
        }
        let delay = 100 * i
        setTimeout(() => {
            box.style.backgroundColor = letterColor
            shadeKeyBoard(letter, letterColor)
        }, delay)
    }

    //check if right word
    if (guessString === rightGuessString) {
        alert("You are correct!")
        guessesLeft = 0
        updateScore(localStorage.getItem("score"))
        saveScore(localStorage.getItem("score"))
        return
    } else {
        guessesLeft -= 1;
        currentGuess = [];
        nextLetter = 0;

        if (guessesLeft === 0) {
            alert("Incorrect. Better luck next time!")
        }
    }

}

function insertLetter(pressedKey) {
    if(nextLetter === 5) {
        return
    }
    pressedKey = pressedKey.toUpperCase()

    let row = document.getElementsByClassName("letter-row")[6 - guessesLeft]    //this gets the row
    let box = row.children[nextLetter] //this will get the column
    box.textContent = pressedKey
    pressedKey = pressedKey.toLowerCase()

    box.classList.add("filled-box")
    currentGuess.push(pressedKey)
    nextLetter += 1
    console.log(currentGuess)
}

function shadeKeyBoard(letter, color) {
    let upLetter = letter.toUpperCase()
    for (const elem of document.getElementsByClassName("keyboard-btn")) {
        if (elem.textContent === upLetter) {
            let oldColor = elem.style.backgroundColor
            if (oldColor === 'rgb(165, 237, 165)') {    //if green then don't color
                return
            }

            if (oldColor === 'rgb(241, 241, 139)' && color !== 'rgb(165, 237, 165)') {  //if yellow and not green go back, if green it will change to green
                return
            }

            elem.style.backgroundColor = color
            break
        }
    }
}

document.getElementById("log-btn").addEventListener("click", (e) => {
    console.log("Resetting...")

    let board = document.getElementById("game-board")
    
    while (board.hasChildNodes()) {
        board.removeChild(board.lastChild)
    }
    //reset the guesses and get a new word
    guessesLeft = NUMBER_OF_GUESSES;
    currentGuess = [];
    nextLetter = 0;
    rightGuessString = WORDS[Math.floor(Math.random() * WORDS.length)]
    console.log(rightGuessString)
    let baseColor = 'rgb(113, 120, 127)'
    //get the keyboard back to normal
    for (const elem of document.getElementsByClassName("keyboard-btn")) {
        elem.style.backgroundColor = baseColor
    }
    makeBoard()
})


function updateScore(score) {
    console.log("updating score!")
    let newScore = Number(score)
    if (newScore > 0) {
        newScore++
    } else {newScore = 1}
    localStorage.score = newScore
    console.log(localStorage.score) 
}

function saveScore(score) {
    const userName = localStorage.getItem('userName');
    let scores = [];
    const scoresText = localStorage.getItem('scores');
    if (scoresText) {
      scores = JSON.parse(scoresText);
    }
    scores = updateScores(userName, score, scores);

    localStorage.setItem('scores', JSON.stringify(scores));
}

function updateScores(userName, score, scores) {
    const newScore = { name: userName, score: score };

    let found = false;
    for (const [i, prevScore] of scores.entries()) {
      if (score > prevScore.score) {
        scores.splice(i, 0, newScore);
        found = true;
        break;
      }
    }

    if (!found) {
      scores.push(newScore);
    }

    if (scores.length > 10) {
      scores.length = 10;
    }

    return scores;
}

setInterval(() => {
    const score = Math.floor(Math.random() * 3000);
    const chatText = document.querySelector('#player-messages');
    chatText.innerHTML =
      `<div class="event"><span class="player-event">Eich</span> scored ${score}</div>` + chatText.innerHTML;
}, 5000);

