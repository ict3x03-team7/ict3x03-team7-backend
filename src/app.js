const express = require('express');
const cors = require('cors');
const userRouter = require('./infra/http/routes/user');
const authRouter = require('./infra/http/routes/authentication');
const patrickstar = require('./infra/http/routes/patrickStar');
const morgan = require('morgan');
const helmet = require('helmet');
const redisSession = require('./modules/session/session');
const {
  checkAuthentication,
  checkAuthorization,
} = require('./modules/authentication/services/AuthenticationService');

const dotenv = require('dotenv');
dotenv.config();

const app = express();

//session management

//if we are running a proxy (e.g. nginx)
// app.set('trust proxy', 1)

// 6 api calls per minute?

app.use(
  cors({
    origin: 'http://127.0.0.1',
    credentials: true,
  }),
);

app.use(helmet());
app.use(morgan('dev'));
app.use(express.json('50mb'));
app.use(redisSession);

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/user', userRouter);
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
      redisClient.expire(email, 60 * process.env.SESSION_TIMEOUT);
      res.json('You are now logged in');
    }
  } else {
    res.status(401).json('Incorrect credentials');
  }
});

// //adding auth middleware // extend session
// app.use((req, res, next) => {
//   if (!req.session || !req.session.userID) {
//     res.status(401).json('You are not logged in!');
//     next();
//   } else {
//     const session = req.session;

//     // Check if the session is nearing expiry (e.g., 5 minutes before expiry)
//     const expiryThreshold = 2 * 60 * 1000; // 5 minutes in milliseconds
//     const now = Date.now();
//     const sessionExpiry = session.cookie.expires.getTime();

//     if (sessionExpiry - now > 0) {
//       // Notify the server that the session is nearing expiry
//       // You can perform actions like logging or triggering a refresh here
//       console.log('Session Time left (Before renew):', sessionExpiry - now);
//       //extending session
//       const email = req.session.clientId;
//       const key = req.sessionID;
//       const minuteToAdd = 2;
//       req.session.cookie.expires = new Date(Date.now() + process.env.SESSION_TIMEOUT * 60 * 1000);
//       req.session.cookie.maxAge = process.env.SESSION_TIMEOUT * 60 * 1000;
//       req.session.save();
//       console.log(
//         'Session Time left (After renew):',
//         session.cookie.expires.getTime() - Date.now(),
//       );
//       redisClient.set(email, key);
//       redisClient.expire(email, 60 * process.env.SESSION_TIMEOUT);
//     }
//   }
//   next();
// });

app.use(checkAuthentication);

//this route will only run after the above middleware
app.get('/testSession', (req, res) => {
  res.json(req.session);
});

app.get('/testLogout', (req, res) => {
  req.session.destroy();
  res.json(req.session);
});

app.use(checkAuthorization);

app.get('/adminMessage', (req, res) => {
  res.json('Admin Admin Admin');
});

module.exports = app;
