const { MongoClient } = require('mongodb');
const bcrypt = require('bcrypt');
const uuid = require('uuid');

const config = require('./dbConfig.json');

const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;
const client = new MongoClient(url);
const db = client.db('startup');
const userCollection = db.collection('user');
const statsCollection = db.collection('stats');


// TEST CONNECTION...
(async function testConnection() {
  await client.connect();
  await db.command({ ping: 1 });
})().catch((ex) => {
  console.log(`Unable to connect to database with ${url} because ${ex.message}`);
  process.exit(1);
});


// USER FUNCTIONS...
async function createUser(username, password) {
  const passwordHash = await bcrypt.hash(password, 10);
  const user = {
    username: username,
    password: passwordHash,
    token: uuid.v4(),
  };
  await userCollection.insertOne(user);
  const stats = {
    username: username,
    plays: 0,
    wins: 0,
    scores: [0,0,0]
  }
  await statsCollection.insertOne(stats);
  return user;
}

function getUser(username) {
  return userCollection.findOne({ username: username });
}

function getUserByToken(token) {
  return userCollection.findOne({ token: token });
}

// STATS FUNCTIONS...
async function updateStats(username, stats) {
  const query = { username: username };
  const update = {
    $set: {
      plays: stats.plays,
      wins: stats.wins,
      scores: stats.scores
    }
  }
  const response = await statsCollection.updateOne(query, update);
  return response;
}

async function getStats(username) {
  const query = { username: username };
  const response = await statsCollection.findOne(query);
  return response;
}


// EXPORT FUNCTIONS...
module.exports = { createUser, getUser, getUserByToken, updateStats, getStats };