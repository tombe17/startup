import { WORDS } from "./words.js";

let wordOfDay = WORDS[Math.floor(Math.random() * WORDS.length)]
console.log(wordOfDay)

function displayQuote() {
    const URL = 'https://api.dictionaryapi.dev/api/v2/entries/en/' + wordOfDay;
    fetch(URL)
        .then((response) => {
            //If it fails just throw in a word, else use the word
            if(!response.ok) {
                console.log("Not ok")
                const wordEl = document.querySelector('#word-of-day');
                wordEl.textContent = 'pedant';
            
                const defEl = document.querySelector('#def');
                defEl.textContent = 'a person who is excessively concerned with minor details and rules or with displaying academic learning';
                return Promise.reject(response);
            }
            return response.json();
        })
        .then((data) => {
            console.log(data[0]);
            const wordEl = document.querySelector('#word-of-day');
            wordEl.textContent = data[0].word;
            
            console.log(data[0].meanings[0].definitions[0].definition)
            const defEl = document.querySelector('#def');
            defEl.textContent = data[0].meanings[0].definitions[0].definition;
        });
}

displayQuote();
  