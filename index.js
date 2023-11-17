const express = require('express');
const bcrpyt = require('bcrypt');
const cookieParser = require('cookie-parser');
const app = express();
const DB = require('./database.js');

const authCookieName = 'token';

// The service port. In production the front-end code is statically hosted by the service on the same port.
const port = process.argv.length > 2 ? process.argv[2] : 4000;

// JSON body parsing using built-in middleware
app.use(express.json());

//use cookie-parser for authentication
app.use(cookieParser());

// Serve up the front-end static content hosting
app.use(express.static('public'));

//trust headers from the proxy to determine IP address
app.set('trust proxy', true);


// Router for service endpoints
var apiRouter = express.Router();
app.use(`/api`, apiRouter);

//CreateAuth token for new user
apiRouter.post('/auth/create', async (req, res) => {
  console.log("making a new user");
  if (await DB.getUser(req.body.email)) {
    res.status(409).send({ msg: 'Existing user' }); //if they exist don't make one
  } else {
    const user = await DB.createUser(req.body.email, req.body.password);

    setAuthCookie(res, user.token);

    res.send({
      id: user._id,
    });
  }
});

// GetAuth token given credentials
apiRouter.post('/auth/login', async (req, res) => {
  const user = await DB.getUser(req.body.email);
  if (user) { //if they exist
    if (await bcrpyt.compare(req.body.password, user.password)) { //if password matches
      setAuthCookie(res, user.token);
      res.send({ id: user._id });
      return;
    }
  }
  res.status(401).send({ msg: 'Unauthorized' });
});

//DeleteAuth token if in cookie
apiRouter.delete('/auth/logout', (_req, res) => {
  res.clearCookie(authCookieName);
  res.status(204).end();
});

//GetUser returns info for user
apiRouter.get('/user/:email', async (req, res) => {
  const user = await DB.getUser(req.params.email);
  if (user) {
    const token = req?.cookies.token;
    res.send({ email: user.email, authenticated: token === user.token });
    return;
  }
  res.status(404).send({ msg: 'Unknown' });
});

// secureApiRouter verifies credentials for endpoints
var secureApiRouter = express.Router();
apiRouter.use(secureApiRouter);

secureApiRouter.use(async (req, res, next) => {
  authToken = req.cookies[authCookieName];
  const user = await DB.getUserByToken(authToken);
  if (user) {
    next();
  } else {
    console.log('no user to get');
    res.status(401).send({ msg: 'Unauthorized' });
  }
});

// GetScores - calls gethighscores from database.js
secureApiRouter.get('/scores', async (_req, res) => {
  const scores = await DB.getHighScores();
  res.send(scores);
});

secureApiRouter.get('/score/:name', async (req, res) => {
  const score = await DB.getScore(req.params.name);
  res.send(score);
});


// SubmitScore - calls addScore from database.js
secureApiRouter.post('/score', async (req, res) => {
  const score = { ...req.body, ip: req.ip };
  await DB.addScore(score);
  //DB.addScore(req.body.score, req.body.name);
  const scores = await DB.getHighScores();
  res.send(scores);
});


//handling errors
app.use(function (err, req, res, next) {
  res.status(500).send({ type: err.name, message: err.message });
});

// Return the application's default page if the path is unknown
app.use((_req, res) => {
  res.sendFile('index.html', { root: 'public' });
});

function setAuthCookie(res, authToken) {
  res.cookie(authCookieName, authToken, {
    secure: true, //must use https
    httpOnly: true, //javascript can use cookie
    sameSite: 'strict', //returns cookie to same domain only
  });
}

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
