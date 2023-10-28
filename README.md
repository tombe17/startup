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

- HTML - Uses correct HTML structure for application. Four HTML pages. One for login, one for the game, one for scores, and one for info. Hyperlinks to different pages.
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

## HTML Deliverable
For this deliverable I built out the structure of my application using HTML.

HTML pages - Four HTML page that represent the ability to login, play, see scores, and see info about the game.  Links - Each page has links to the other pages, and by logging in you are sent to play.  
Text - Each word will be represented by text.  
Images - Images will show combos of words on the about page.  
Login - Input box and submit button for login.  
Database - The words to guess represent data pulled from the database.  
WebSocket - The function of assessing if letters are correct represetns realtime assessment of letters.

## CSS Deliverable
For this deliverable I properly styled the application into its final appearance.

- Used header, footer, and main content body
- Navigation elements - I redesigned the links to look more simple and without any bullet points or underlines. They --also change color when hovering over them.
- Responsive to window resizing - My app looks great on all window sizes and devices, on the play screen it will hide the live feed when your screen is smaller.
- Application elements - Used good contrast and whitespace, made a theme with a nice vibrant blue and a light pink.
- Application text content - Consistent fonts across the whole site.
- Application images - fit a small image on the about page.

##Javascript Deliverable
For this deliverable I implemented by JavaScript so that the application works for a single user. I also added placeholders for future technology.

- Login - When you press enter or the login button it takes you to the play page and stores your name in local storage.
- Database - The score page holds the top 10 scores. Currently this is stored and retrieved from local storage, but it will be replaced with the database data later.
- WebSocket - I made a spot where it will update users on update to scores, I just put placeholder names, but will be changed with other players once it get implemented.
- Application logic - I incorporated the logic to allow user input to type and guess words, and to reset the board.
