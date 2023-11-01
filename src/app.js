const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const fs = require('fs');

const authRouter = require('./infra/http/routes/authentication');
const userRouter = require('./infra/http/routes/user');
const recipeRouter = require('./infra/http/routes/recipe');
const redisSession = require('./modules/session/session');
const { rateLimit } = require('express-rate-limit');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const dotenv = require('dotenv');
dotenv.config();

const app = express();
//if we are running a proxy (e.g. nginx)
app.set('trust proxy', 1);

app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  }),
);

const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minutes
  limit: 10,
  standardHeaders: 'draft-7', // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  message: 'The server is busy at the moment, please try again.',
});
//creating Log file
var logFile = fs.createWriteStream('./recipeHub.log', { flags: 'w' }); //use {flags: 'w'} to open in write mode

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet());
app.use(morgan('combined', { stream: logFile }));
app.use(express.json({ limit: '25mb' }));
app.use(redisSession);
app.use(limiter);
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/user', userRouter);
app.use('/api/v1/recipe', recipeRouter);

module.exports = app;
