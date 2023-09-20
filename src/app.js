const express = require('express');
const cors = require('cors');
const userRouter = require('./infra/http/routes/user');
const authRouter = require('./infra/http/routes/authentication');
const dummyRouter = require('./infra/http/routes/dummy');
const patrickstar = require('./infra/http/routes/patrickStar');
const morgan = require('morgan');
const helmet = require('helmet');

const app = express();

//session management
const session = require('express-session');
const redis = require('redis');
const RedisStore = require('connect-redis').default;

//configure redis
const redisClient = redis.createClient({
  url: 'redis://localhost:8090',
  password: process.env.REDIS_PASSWORD,
});
redisClient.connect().catch(console.error);

//if we are running a proxy (e.g. nginx)
// app.set('trust proxy', 1)

// 6 api calls per minute?

app.use(
  session({
    store: new RedisStore({ client: redisClient }),
    secret: '$2b$13$/o23Z/ClNbw07A4jJEonme',
    saveUninitialized: false,
    name: 'sessionID',
    resave: false, //will not overwrite session
    rolling: true, //will reset expiry to MaxAge
    cookie: {
      secure: false, //if true need https
      httpOnly: true, //prevents client side JS from reading the cookie
      maxAge: 1000 * 60 * 2, //in milliseconds
    },
  }),
);

app.use(
  cors({
    origin: 'http://127.0.0.1',
    credentials: true,
  }),
);

app.use(helmet());
app.use(morgan('dev'));
app.use(express.json('50mb'));

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/user', userRouter);
app.use('/dummy', dummyRouter);
app.use('/patrickstar', patrickstar);

let count = 0;

app.post('/testLogin', async (req, res) => {
  const { email, password } = req.body;
  console.log({ email, password });
  //assuming that credentials are correct
  if (password === 'password123') {
    req.session.clientId = email;
    const key = req.sessionID;

    const sessionExists = await redisClient.get(email);
    console.log(sessionExists);
    if (sessionExists) {
      res.json('You are already logged in on another device!');
      count++;
      console.log(count);
      // req.session.destroy();
      // await redisClient.del('sess:' + sessionExists);
      // await redisClient.del(email);
    } else {
      // redisClient.set(email, key);
      redisClient.set(email, key);
      redisClient.expire(email, 60 * 2);
      res.json('You are now logged in');
    }
  } else {
    res.status(401).json('Incorrect credentials');
  }
});

//adding auth middleware // extend session
app.use((req, res, next) => {
  if (!req.session || !req.session.clientId) {
    res.status(401).json('You are not logged in!');
    next();
  } else {
    const session = req.session;

    // Check if the session is nearing expiry (e.g., 5 minutes before expiry)
    const expiryThreshold = 2 * 60 * 1000; // 5 minutes in milliseconds
    const now = Date.now();
    const sessionExpiry = session.cookie.expires.getTime();

    if (sessionExpiry - now > 0) {
      // Notify the server that the session is nearing expiry
      // You can perform actions like logging or triggering a refresh here
      console.log('Session Time left (Before renew):', sessionExpiry - now);
      //extending session
      const email = req.session.clientId;
      const key = req.sessionID;
      const minuteToAdd = 2;
      req.session.cookie.expires = new Date(Date.now() + minuteToAdd * 60 * 1000);
      req.session.cookie.maxAge = minuteToAdd * 60 * 1000;
      req.session.save();
      console.log(
        'Session Time left (After renew):',
        session.cookie.expires.getTime() - Date.now(),
      );
      redisClient.set(email, key);
      redisClient.expire(email, 60 * minuteToAdd);
    }
  }
  next();
});

//this route will only run after the above middleware
app.get('/testSession', (req, res) => {
  res.json(req.session);
});

app.get('/testRenew', async (req, res) => {
  const email = req.session.clientId;
  const key = req.sessionID;
  const minuteToAdd = 3;
  req.session.cookie.expires = new Date(Date.now() + minuteToAdd * 60 * 1000); // Extending by 30 minutes
  req.session.cookie.maxAge = minuteToAdd * 60 * 1000;
  req.session.save();
  redisClient.set(email, key);
  redisClient.expire(email, 60 * minuteToAdd);
  res.json(req.session);
});

app.get('/testLogout', (req, res) => {
  req.session.destroy();
  res.json(req.session);
});

module.exports = app;
