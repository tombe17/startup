import { WORDS } from "./words.js";

class Game {

    NUMBER_OF_GUESSES;
    guessesLeft;
    currentGuess;
    nextLetter;
    rightGuessString;
    score;

    constructor() { //outline variables and assign them values, also make the board
        this.NUMBER_OF_GUESSES = 6;
        this.guessesLeft = this.NUMBER_OF_GUESSES;
        this.currentGuess = [];
        this.nextLetter = 0;
        this.score = 0;

        this.rightGuessString = WORDS[Math.floor(Math.random() * WORDS.length)];
        console.log(this.rightGuessString);

        const nameEl = document.querySelector('#user-name');
        nameEl.textContent = this.getPlayerName();

        let board = document.getElementById("game-board")

        for (let i = 0; i < this.NUMBER_OF_GUESSES; i++) {
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

    getPlayerName() {
        return localStorage.getItem('userName') ?? 'Mystery player';
    }

    //game functions - insert
    insertLetter(pressedKey) {
        if(this.nextLetter === 5) {
            return
        }
        pressedKey = pressedKey.toUpperCase()
    
        let row = document.getElementsByClassName("letter-row")[6 - this.guessesLeft]    //this gets the row
        let box = row.children[this.nextLetter] //this will get the column
        box.textContent = pressedKey
        pressedKey = pressedKey.toLowerCase()
    
        box.classList.add("filled-box")
        this.currentGuess.push(pressedKey)
        this.nextLetter += 1
        console.log(this.currentGuess)
    }  
    //delete letter
    deleteLetter() {
        let row = document.getElementsByClassName("letter-row")[6 - this.guessesLeft]
        let box = row.children[this.nextLetter - 1]
        box.textContent = ""
    
        box.classList.remove("filled-box")
        this.currentGuess.pop()
        this.nextLetter -=1
        console.log(this.currentGuess)
    }
    //guess word
    async checkGuess() {
        let row = document.getElementsByClassName("letter-row")[6 - this.guessesLeft]
        let guessString = ''
        let rightGuess = Array.from(this.rightGuessString)

        for (const val of this.currentGuess) {
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
            let letter = this.currentGuess[i]

            let letterPosition = rightGuess.indexOf(this.currentGuess[i])
            //is letter in the correct guess
            if (letterPosition === -1) {
                letterColor = 'rgb(83, 87, 91)'  //gray

            } else {
                //we know it is in the word
                //if letter index = right guess index then in position
                if(this.currentGuess[i] === rightGuess[i]) {
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
        if (guessString === this.rightGuessString) {
            alert("You are correct!")
            this.guessesLeft = 0
            //grab the score from the database
            let response = await fetch('/api/score/'+this.getPlayerName());
            response = await response.json();
            this.score = response.score;
            console.log(`We got this from the db: ${this.score}`)

            this.updateScore(this.score)
            this.saveScore()
            return
        } else {
            this.guessesLeft -= 1;
            this.currentGuess = [];
            this.nextLetter = 0;
            if (this.guessesLeft === 0) {
                alert("Incorrect. Better luck next time!")
            }
        }
    }

    updateScore(score) {
        console.log("updating score!")
        
        let newScore = Number(score)
        if (newScore > 0) {
            newScore++
        } else {newScore = 1}
        localStorage.score = newScore
        console.log(localStorage.score)
        this.score = newScore;
    }    

    //save & update scores
    async saveScore() {
        //this.score += 1;
        const userName = this.getPlayerName();
        const newScore = {name: userName, score: this.score};
        console.log(this.score)
        
        try {
          const response = await fetch('/api/score', {
            method: 'POST',
            headers: {'content-type': 'application/json'},
            body: JSON.stringify(newScore),
          });
    
          // Store what the service gave us as the high scores
          const scores = await response.json();
          localStorage.setItem('scores', JSON.stringify(scores));
        } catch {
          // If there was an error then just track scores locally
          this.updateScoresLocal(newScore);
        }
    }
    
    updateScoresLocal(newScore) {
        let scores = [];
        const scoresText = localStorage.getItem('scores');
        if (scoresText) {
          scores = JSON.parse(scoresText);
        }
    
        let found = false;
        for (const [i, prevScore] of scores.entries()) {
          if (newScore > prevScore.score) {
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
        localStorage.setItem('scores', JSON.stringify(scores));
    }
    
    //reset
    reset() {
        let board = document.getElementById("game-board")
    
        while (board.hasChildNodes()) {
            board.removeChild(board.lastChild)
        }
        let baseColor = 'rgb(113, 120, 127)'
        //get the keyboard back to normal
        for (const elem of document.getElementsByClassName("keyboard-btn")) {
            elem.style.backgroundColor = baseColor
        }
        game = new Game();
    }    
}

let game = new Game();

//How to get user input

document.getElementById("keyboard").addEventListener("click", (e) => {
    const target = e.target

    if (!target.classList.contains("keyboard-btn")) {
        return
    }
    let key = target.textContent
    //console.log(key)

    if (key === "DEL") {
        key = "Backspace"
    }

    if (key === "ENTER") {
        key = "Enter"
    }

    document.dispatchEvent(new KeyboardEvent("keyup", {'key': key}))
})

document.addEventListener("keyup", (e) => {
    if(game.guessesLeft === 0) {
        return;
    }

    let pressedKey = String(e.key);
    if (pressedKey === "Backspace" && game.nextLetter !== 0) {
        game.deleteLetter()
        return
    }

    if (pressedKey === "Enter") {
        game.checkGuess()
        return
    }
    
    if (pressedKey.length > 1) {
        return
    }

    let found = pressedKey.match(/[a-z]/gi)
    if (!found || found.length > 1) {
        return
    } else {
        game.insertLetter(pressedKey)
    }
})

//shade key board
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

//reset button
document.getElementById("log-btn").addEventListener("click", (e) => {
    console.log("Resetting...")
    game.reset()
})

setInterval(() => {
    const score = Math.floor(Math.random() * 3000);
    const chatText = document.querySelector('#player-messages');
    chatText.innerHTML =
      `<div class="event"><span class="player-event">Eich</span> scored ${score}</div>` + chatText.innerHTML;
}, 5000);
