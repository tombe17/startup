import { WORDS } from "./words.js";

const NUMBER_OF_GUESSES = 6;
let guessesLeft = NUMBER_OF_GUESSES;
let currentGuess = [];
let nextLetter = 0;
let rightGuessString = WORDS[Math.floor(Math.random() * WORDS.length)]
console.log(rightGuessString)

makeBoard()

function makeBoard() {
    let board = document.getElementById("game-board")

    // if (board.hasChildNodes) {
    //     removeAllChildNodes(board)
    // }

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

    if (!target.classList.contains("btn btn-secondary")) {
        return
    }
    let key = target.textContent
    console.log(key)

    if (key === "DEL") {
        key = "Backspace"
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

    if (pressedKey == "Enter") {
        checkGuess()
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
            letterColor = 'rgb(113, 120, 127)'  //gray

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
    for (const elem of document.getElementsByClassName("btn btn-secondary")) {
        if (elem.textContent === letter) {
            let oldColor = elem.style.backgroundColor
            if (oldColor === 'rgb(165, 237, 165)') {    //gray
                return
            }

            if (oldColor === 'rgb(241, 241, 139)' && color !== 'rgb(165, 237, 165)') {  //yellow then green
                return
            }

            elem.style.backgroundColor = color
            break
        }
    }
}