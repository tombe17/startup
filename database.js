const { MongoClient } = require('mongodb');
const bcrypt = require('bcrypt');
const uuid = require('uuid');
const config = require('./dbConfig.json');

const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;
const client = new MongoClient(url);
const db = client.db('wirdle');
const userCollection = db.collection('user');
const scoreCollection = db.collection('score');

(async function testConnection() {
    await client.connect();
    await db.command({ping: 1 });
    console.log("connected to db")
})().catch((ex) => {
    console.log(`unable to connect with ${url} because ${ex.message}`);
    process.exit(1);
});

function getUser(email) {
    return userCollection.findOne({ email: email });
}

function getUserByToken(token) {
    console.log("getting user by token");
    return userCollection.findOne({ token: token });
}

//creating a new user
async function createUser(email, password) {
    //hash password
    const passHash = await bcrypt.hash(password, 10);

    const user = {
        email: email,
        password: passHash,
        token: uuid.v4(),
    };
    await userCollection.insertOne(user);

    return user;
}

//add a new score or update an existing one
async function addScore(score, name) {
    const updateScore = await scoreCollection.findOne({name})
    if (updateScore) {
        //console.log("Updating database")
        return await scoreCollection.updateOne({name}, {$set :{"score":score}})
    }
    const result = await scoreCollection.insertOne({score, name});
    return result;
}

async function getScore(name) {
    const score = await scoreCollection.findOne({name})
    return score;
}

//get scores
function getHighScores() {
    const query = { score: { $gt: 0, $lt: 900 } };
    const options = {
      sort: { score: -1 },
      limit: 10,
    };
    const cursor = scoreCollection.find(query, options);
    return cursor.toArray();
}
  
module.exports = { 
    getUser,
    getUserByToken,
    createUser,
    addScore, 
    getHighScores, 
    getScore, 
};