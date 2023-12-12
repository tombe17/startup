import React, { useState, useEffect, useRef } from 'react';
import { Board } from './board';
import { WORDS } from './words';
import { GameEvent, GameNotifier } from './gameNotifier';

export function Game(props) {
  const userName = props.userName;

  let boardRows = [
    [0, 1, 2, 3, 4],
    [5, 6, 7, 8, 9],
    [10, 11, 12, 13, 14],
    [15, 16, 17, 18, 19],
    [20, 21, 22, 23, 24],
    [25, 26, 27, 28, 29],
  ];

  const keyboardRows = [
    ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
    ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
    ['ENTER', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'DEL'],
  ];

  const initialKeyColors = [];
  keyboardRows.map(row => {
    row.map(key => {
      initialKeyColors[key] = 'rgb(83, 87, 91)'; // You can set the default color here
    });
  });
  
  let letterIndex = useRef(0);
  let round = useRef(0);

  const [correctWord, setCorrectWord] = useState(WORDS[Math.floor(Math.random() * WORDS.length)])
  const [isPlaying, setIsPlaying] = useState(true);
  const [squareStates, setSquareStates] = useState(boardRows.map(row => row.map(() => '')));
  const [colors, setColors] = useState(boardRows.map(row => row.map(() => '')));
  const [keyColors, setKeyColors] = useState(initialKeyColors);

  function handleIsPlaying() {
    setIsPlaying((prev) => !prev);
  }

  const handleClick = (key) => {
    {key == 'DEL' && (key = 'Backspace')}
    {key == 'ENTER' && (key = 'Enter')}
    //console.log(key)
    handleEvent(key)
  } 

  const handleKeyUp = (key) => {
    key = key.key 
    handleEvent(key)
  }

  function handleEvent(key) {
    let pressedKey = key;
    //If Backspace or Enter then do corresponding action
    {pressedKey == 'Backspace' && deleteLetter()}
    {pressedKey == 'Enter' && checkGuess()}

    //if just a letter match it and then check the word
    {pressedKey.length > 1 ? null : insertLetter(pressedKey)}
  }

  const insertLetter = (letter) => {
    //check if playing
    if (isPlaying === false) {
      console.log("can't play or delete")
      return
    }

    const _letterIndex = letterIndex.current;
    const _round = round.current;
    letter = String(letter)

    if (_letterIndex < 5) {
      setSquareStates((prev) => {
        const squareStates = { ...prev };
        squareStates[_round][_letterIndex] = letter.toUpperCase();
        return squareStates;
      });
      letterIndex.current = _letterIndex + 1;
    }
  }

  const deleteLetter = () => {
    //check if playing
    if (isPlaying === false) {
      console.log("can't play or delete")
      return
    }

    const _letterIndex = letterIndex.current;
    const _round = round.current;
    if (_letterIndex !== 0) {
      setSquareStates((prev) => {
        const squareStates = { ...prev };
        squareStates[_round][_letterIndex - 1] = "";
        return squareStates;
      });
      letterIndex.current = _letterIndex - 1;
    }
  }

  const checkGuess = () => {
    //check if playing
    if (isPlaying === false) {
      console.log("can't play")
      return
    }

    const _round = round.current;
    const _letterIndex = letterIndex.current;
    let currentGuessArray = squareStates[_round];
    //console.log('Round: ' + _round, '\n', currentGuessArray, '\n', "Right Word: " + correctWord)
    //make an if to make sure it is 5 letters long
    let isRightLength = checkGuessLength(currentGuessArray)
    
    if(isRightLength) {
      //also check for valid word
      let guessString = currentGuessArray.join('');
      guessString = guessString.toLowerCase();
      console.log(guessString);
      if(!WORDS.includes(guessString)) {
        alert("That ain't a word...")
        return
      }
      //make guess array all of guessString so it is lowercase
      let guessArray = guessString.split('');
      //compare each letter of the array to the word and fill in letters
      let letterPositions = guessArray.map((char) => correctWord.indexOf(char));
      
      //check if correct word, if so return and send alert
      if (guessString == correctWord) {
        alert("You found the wird!")
        //paint all letters green
        letterPositions = [0, 1, 2, 3, 4];
        paintColors(letterPositions, guessString, _round);
        
        //update scores
        saveScore();
        //set isPlaying to False
        handleIsPlaying();
        round.current = 6;
        return
      }
      //else move to next round & paint letters
      paintColors(letterPositions, guessString, _round);

      round.current = _round + 1;
      letterIndex.current = 0;
      //if last guess then return
      if(round.current == 6) {
        alert("Better luck next time.")
      }

    } else {
      console.log("not enough letters")
    }
   
  }
  //function for checking guess
  function isLetter(str) {
    return /^[A-Za-z]+$/.test(str);
  }
  function checkGuessLength(arr) {
    return arr.every(isLetter);
  }
  function paintColors(letterPositions, word, currRound) {//letterpositions is an array of where the values are
    word = word.toUpperCase();
    word = word.split('');
    
    for (let i = 0; i < 5; i++) {
      if (letterPositions[i] == -1) {
        setColors((prev) => {
          const colors = { ...prev };
          colors[currRound][i] = 'rgb(113, 120, 127)';  //gray color
          return colors;
        });
        //paint corresponding keyboard button
        keyColors[word[i]] = 'rgb(113, 120, 127)';

      } else if(letterPositions[i] == i) {//we know it is in the word now check if in right spot
          setColors((prev) => {
            const colors = { ...prev };
            colors[currRound][i] = 'rgb(165, 237, 165)';  //green
            return colors;
          });
          keyColors[word[i]] = 'rgb(165, 237, 165)';
      } else {  //must be in word but wrong spot
        setColors((prev) => {
          const colors = { ...prev };
          colors[currRound][i] = 'rgb(241, 241, 139)';  ///yellow
          return colors;
        });
        //color yellow if not already green
        if (keyColors[word[i]] != 'rgb(165, 237, 165)') {
          keyColors[word[i]] = 'rgb(241, 241, 139)';
        }
      }
    }
  }

  async function saveScore() {
    let newScore = 1;
    //first check if they are in db and can grab score
    let response = await fetch('/api/score/' + userName);
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.indexOf("application/json") !== -1) {
        //get score + increment by 1
        response = await response.json();
        //increment by 1
        newScore = response.score + 1;
    } else {    //not in database
        console.log("We need to make a user")
        //set score to 1 and then pass score through next function
        localStorage.score = newScore
        console.log(localStorage.score)
    }

    const userScore = {name: userName, score: newScore};
    console.log(userScore)
    
    try {
      const response = await fetch('/api/score', {
        method: 'POST',
        headers: {'content-type': 'application/json'},
        body: JSON.stringify(userScore),
      });
      //broadcast event
      GameNotifier.broadcastEvent(userName, GameEvent.End, newScore);

      // Store what the service gave us as the high scores
      const scores = await response.json();
      localStorage.setItem('scores', JSON.stringify(scores));
    } catch {
      // If there was an error then just track scores locally
      updateScoresLocal(userScore);
    }
  }

  function updateScoresLocal(newScore) {
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

  async function reset() {
    console.log("reseting...")
    //reset board guesses
    letterIndex.current = 0;
    round.current = 0;
    setCorrectWord(WORDS[Math.floor(Math.random() * WORDS.length)]);

    //get the keyboard back to normal
    setKeyColors((prev) => {
      const newColors = {}
      Object.keys(prev).forEach(key => {
        newColors[key] = 'rgb(83, 87, 91)';
      });
      return newColors
    })

    //get board back to normal
    setColors(boardRows.map(row => row.map(() => '')));
    setSquareStates(boardRows.map(row => row.map(() => '')));

    //allow game to play
    handleIsPlaying();
    //broadcast event
    GameNotifier.broadcastEvent(userName, GameEvent.Start, {});
  }

  useEffect(() => {
    document.addEventListener('keyup', handleKeyUp);
    // Clean up the event listener when the component unmounts
    return () => {
      document.removeEventListener('keyup', handleKeyUp);
    };
  }, [reset]);

  return (
    <>

    {/*}The game grid*/}
    <div id="game-board"> 
      <Board 
      currentGuess={squareStates[round.current]} 
      squareStates={squareStates}
      colors={colors}
      />
    </div>
    

    {/*The letters for the words*/}
    <div className="ctr-item" id="keyboard" style={{marginTop: ".5em"}}>
      {keyboardRows.map((row, rowIndex) => (
        <div key={rowIndex}>
          {row && 
            row.map((btnLtr, columnIndex) => (
            <button
              className='keyboard-btn'
              key={columnIndex}
              style={{ backgroundColor: keyColors[btnLtr] }}
              onClick={() => handleClick(btnLtr)}
            >{btnLtr}</button>
          ))}
        </div>
      ))}
    </div>
    {isPlaying ? 
    <div className="ctr-item">
      <button 
        type="button" 
        className="btn btn-primary" 
        id="sub-btn"
        onClick={() => checkGuess()}
      >Submit</button>
    </div> :
    <div className="ctr-item">
      <button 
        type="button" 
        className="btn btn-primary" 
        id="rst-btn"
        onClick={() => reset()} 
      >Reset</button>
    </div>}
  </>
  );
}
