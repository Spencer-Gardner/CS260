const express = require('express');
const app = express();

const port = process.argv.length > 2 ? process.argv[2] : 4000;
app.use(express.json());
app.use(express.static('public'));

var apiRouter = express.Router();
app.use(`/api`, apiRouter);

let stats = {plays: 0, wins: 0, scores: [0, 0, 0]};

// get stats
apiRouter.get('/stats', async (_req, res) => {
  res.send(stats);
});

// post stats
apiRouter.post('/stats', async (req, res) => {
  stats = req.body;
  res.send(stats);
});

app.use((_req, res) => {
  res.sendFile('index.html', { root: 'public' });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});