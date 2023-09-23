const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const fs = require('fs');

const authRouter = require('./infra/http/routes/authentication');
const userRouter = require('./infra/http/routes/user');
const redisSession = require('./modules/session/session');

const dotenv = require('dotenv');
dotenv.config();

const app = express();
//if we are running a proxy (e.g. nginx)
// app.set('trust proxy', 1)

// 6 api calls per minute?

app.use(
  cors({
    origin: 'http://127.0.0.1',
    credentials: true,
  }),
);

var logFile = fs.createWriteStream('./myLogFile.log', { flags: 'w' }); //use {flags: 'w'} to open in write mode

app.use(helmet());
app.use(morgan('combined', { stream: logFile }));
app.use(express.json('50mb'));
app.use(redisSession);
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/user', userRouter);

// app.post('/api/v1/auth/login', async (req, res) => {
//   loginController.execute(req, res);
// });

// app.use(checkAuthentication);

// app.post('/api/v1/auth/verify', async (req, res) => {
//   mfaLoginController.execute(req, res);
// });

// app.get('/api/v1/user/:userID', async (req, res) => {
//   getUserController.execute(req, res);
// });

// //this route will only run after the above middleware
// app.get('/testSession', (req, res) => {
//   res.json(req.session);
// });

// app.get('/testLogout', (req, res) => {
//   req.session.destroy();
//   res.json(req.session);
// });

app.get('/adminMessage', (req, res) => {
  res.json('Admin Admin Admin');
});

module.exports = app;
