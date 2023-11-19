const express = require('express');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');

const app = express();
const DB = require('./database.js');
const authCookieName = 'token';

const port = process.argv.length > 2 ? process.argv[2] : 4000;


// MIDDLEWARE...
app.use(express.json());
app.use(cookieParser());
app.use(express.static('public'));

app.set('trust proxy', true);


// ROUTER...
var apiRouter = express.Router();
app.use(`/api`, apiRouter);


// AUTH & USER ENDPOINTS...
apiRouter.post('/auth/create', async (req, res) => {
  if (await DB.getUser(req.body.username)) {
    res.status(409).send({ msg: 'Existing user' });
  } else {
    const user = await DB.createUser(req.body.username, req.body.password);
    setAuthCookie(res, user.token);
    res.send({
      id: user._id,
    });
  }
});

apiRouter.post('/auth/login', async (req, res) => {
  const user = await DB.getUser(req.body.username);
  if (user) {
    if (await bcrypt.compare(req.body.password, user.password)) {
      setAuthCookie(res, user.token);
      res.send({ id: user._id });
      return;
    }
  }
  res.status(401).send({ msg: 'Unauthorized' });
});

apiRouter.delete('/auth/logout', (_req, res) => {
  res.clearCookie(authCookieName);
  res.status(204).end();
});

apiRouter.get('/user/:username', async (req, res) => {
  const user = await DB.getUser(req.params.username);
  if (user) {
    const token = req?.cookies.token;
    res.send({ username: user.username, authenticated: token === user.token });
    return;
  }
  res.status(404).send({ msg: 'Unknown' });
});


// SECURE ROUTER...
var secureApiRouter = express.Router();
apiRouter.use(secureApiRouter);

secureApiRouter.use(async (req, res, next) => {
  authToken = req.cookies[authCookieName];
  const user = await DB.getUserByToken(authToken);
  if (user) {
    next();
  } else {
    res.status(401).send({ msg: 'Unauthorized' });
  }
});


// STATS ENDPOINTS...
apiRouter.post('/stats/:username', async (req, res) => {
  await DB.updateStats(req.params.username, req.body);
  const stats = await DB.getStats(req.params.username);
  res.send(stats);
});

apiRouter.get('/stats/:username', async (req, res) => {
  const stats = await DB.getStats(req.params.username);
  res.send(stats);
});


// DEFAULTS...
app.use(function (err, req, res, next) {
  res.status(500).send({ type: err.name, message: err.message });
});

app.use((_req, res) => {
  res.sendFile('index.html', { root: 'public' });
});

function setAuthCookie(res, authToken) {
  res.cookie(authCookieName, authToken, {
    secure: true,
    httpOnly: true,
    sameSite: 'strict',
  });
}

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});