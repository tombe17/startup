import { WORDS } from "./words.js";

const NUMBER_OF_GUESSES = 6;
let guessesLeft = NUMBER_OF_GUESSES;
let currentGuess = [];
let nextLetter = 0;
let rightGuessString = WORDS[Math.floor(Math.random() * WORDS.length)]
console.log(rightGuessString)

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
            letterColor = 'grey'

        } else {
            //we know it is in the word
            //if letter index = right guess index then in position
            if(currentGuess[i] === rightGuess[i]) {
                letterColor = 'green'
            } else {
                letterColor = 'yellow'
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
            if (oldColor === 'green') {
                return
            }

            if (oldColor === 'yellow' && color !== 'green') {
                return
            }

            elem.style.backgroundColor = color
            break
        }
    }
}