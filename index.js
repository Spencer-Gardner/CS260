const express = require('express');
const app = express();
const DB = require('./database.js');

const port = process.argv.length > 2 ? process.argv[2] : 4000;
app.use(express.json());
app.use(express.static('public'));

var apiRouter = express.Router();
app.use(`/api`, apiRouter);

apiRouter.get('/stats', async (_req, res) => {
  const stats = await DB.getStats();
  res.send(stats);
});

apiRouter.post('/stats', async (req, res) => {
  await DB.updateStats(req.body);
  const stats = await DB.getStats();
  res.send(stats);
});

app.use((_req, res) => {
  res.sendFile('index.html', { root: 'public' });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});