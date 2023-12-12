import React from 'react';
import './about.css';
import { WORDS } from '../play/words';

export function About() {
  const [word, setWord] = React.useState('');
  const [define, setDefine] = React.useState('Loading...');

  let wordOfDay = WORDS[Math.floor(Math.random() * WORDS.length)];
  console.log(wordOfDay);
  const URL = 'https://api.dictionaryapi.dev/api/v2/entries/en/' + wordOfDay;

  React.useEffect(() => {
    fetch(URL)
    .then((response) => {
      //If it fails just throw in a word, else use the word
      if(!response.ok) {
          console.log("Not ok")
          setWord('pedant');
          setDefine('a person who is excessively concerned with minor details and rules or with displaying academic learning');
          return Promise.reject(response);
      }
      return response.json();
    })
    .then((data) => {
      console.log(data);
      //get data then input into the definition
      const theWord = data[0].word;
      setWord(theWord);
      const theDef = data[0].meanings[0].definitions[0].definition;
      setDefine(theDef);
    })
    .catch();
  }, []);

  return (
    <main>
      <div id="picture" className="center">
        <img width="370px" height="412px" src='/Wordle.png' alt="wordle" />
      </div>

      <div className="info">
        <p>
          Wirdle is a recreation of the game Wordle<sup>&reg;</sup> where you have six guesses to determine the five letter word.
          The Wordle game is a registered trademark of New York Times. My game based off of it is for non-profit
          educational use only. No part of this code or program should be used outside of that definition.
        </p>
      </div>

    <div id="word">
      <div>Word of the Day:</div>
      <div id="word-of-day">{word}</div>
    </div>
    <div className="info" id="def">{define}</div>
  </main>
  );
}