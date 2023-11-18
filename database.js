const { MongoClient } = require('mongodb');
const config = require('./dbConfig.json');

const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;
const client = new MongoClient(url);
const db = client.db('startup');
const statsCollection = db.collection('stats');

// This will asynchronously test the connection and exit the process if it fails
(async function testConnection() {
  await client.connect();
  await db.command({ ping: 1 });
})().catch((ex) => {
  console.log(`Unable to connect to database with ${url} because ${ex.message}`);
  process.exit(1);
});

async function updateStats(stats) {
  const query = { _id: 'stats' };
  const update = { $set: stats };
  const response = await statsCollection.updateOne(query, update);
  return response;
}

async function getStats() {
  const query = { _id: 'stats' };
  const response = await statsCollection.findOne(query);
  return response;
}

module.exports = { updateStats, getStats };