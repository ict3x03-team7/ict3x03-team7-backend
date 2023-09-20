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
