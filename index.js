const express = require('express');
const app = express();
const DB = require('./database.js');


// The service port. In production the front-end code is statically hosted by the service on the same port.
const port = process.argv.length > 2 ? process.argv[2] : 4000;


// JSON body parsing using built-in middleware
app.use(express.json());


// Serve up the front-end static content hosting
app.use(express.static('public'));


// Router for service endpoints
var apiRouter = express.Router();
app.use(`/api`, apiRouter);


// GetScores - calls gethighscores from database.js
apiRouter.get('/scores', async (_req, res) => {
  const scores = await DB.getHighScores();
  res.send(scores);
});

apiRouter.get('/score/:name', async (req, res) => {
  const score = await DB.getScore(req.params.name);
  res.send(score);
});


// SubmitScore - calls addScore from database.js
apiRouter.post('/score', async (req, res) => {
  DB.addScore(req.body.score, req.body.name);
  const scores = await DB.getHighScores();
  res.send(scores);
});


// Return the application's default page if the path is unknown
app.use((_req, res) => {
  res.sendFile('index.html', { root: 'public' });
});


app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
