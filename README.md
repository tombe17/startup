# startup

## The Idea
We all love games, especially ones that make us think. The iconic wordle game allows you to guess a 5-letter word within a determined amount of guesses. However, it only allows one daily try. Why not keep playing the game you love?? That's why I'm making the wonderful wirdle - the i stands for infinity (wordleinfinit wasn't as cool).

**Design**
This work picture outlines the sign in page of the website where you would either make an account or sign into an existing one.

![Screenshot 2023-09-20 145916](https://github.com/tombe17/startup/assets/131499102/eef7cec1-ec90-4d73-a4d7-296de4a58362)

After that it will take you to the main page where you can play wirdle!

![Screenshot 2023-09-20 145929](https://github.com/tombe17/startup/assets/131499102/94838690-3ffa-46a8-b168-e88dee7e75cd)

There will also be a link there for an info page.

![Screenshot 2023-09-20 145948](https://github.com/tombe17/startup/assets/131499102/e2fac456-c0e3-46d2-b17c-8333b8dfc4c8)

**Features**
- Secure login over HTTPS
- Ability to play wordle game
- Displays top word guessers on side
- Ability to play multiple games
- Results are persistently kept
- Ability to see an about page
- Updates high scores in real time

**Technology**

I am going to use the required technologies in the following ways.

- HTML - Uses correct HTML structure for application. Three HTML pages. One for login, one for the game, and one for info. Hyperlinks to different pages.
- CSS - Application styling that looks good on different screen sizes, uses good whitespace, color choice and contrast.
- JavaScript - Provides login, word display, guessing for the words, and backend endpoint calls.
- Service - Backend service with endpoints for:
login
retrieving guesses
submitting guesses
retrieving letter status
- DB - Store users, choices, and votes in database.
- Login - Register and login users. Credentials securely stored in database. Can't play unless authenticated.
- WebSocket - As each user guesses words, their score is broadcast to all other users.
- React - Application ported to use the React web framework.
