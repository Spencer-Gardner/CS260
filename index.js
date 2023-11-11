const express = require('express');
const app = express();

let stats = {plays: 0, wins: 0, scores: [0, 0, 0]};

// The service port. In production the front-end code is statically hosted by the service on the same port.
const port = process.argv.length > 2 ? process.argv[2] : 4000;

// JSON body parsing using built-in middleware
app.use(express.json());

// Serve up the front-end static content hosting
app.use(express.static('public'));

// Router for service endpoints
var apiRouter = express.Router();
app.use(`/api`, apiRouter);

// Get Stats
apiRouter.get('/stats', async (_req, res) => {
  res.send(stats);
});

// Post Stats
apiRouter.post('/stats', (req, res) => {
  stats = req.body;
  res.send(stats);
});

// Return the application's default page if the path is unknown
app.use((_req, res) => {
  res.sendFile('index.html', { root: 'public' });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});