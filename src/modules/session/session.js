const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const session = require('express-session');
const RedisStore = require('connect-redis').default;
const redisClient = require('./redis');

module.exports = session({
  store: new RedisStore({ client: redisClient }),
  secret: process.env.SESSION_SECRET,
  saveUninitialized: false,
  name: 'sessionID',
  resave: false, //will not overwrite session
  rolling: true, //will reset expiry to MaxAge
  cookie: {
    secure: true, //if true need https
    httpOnly: true, //prevents client side JS from reading the cookie
    maxAge: 1000 * 60 * process.env.SESSION_TIMEOUT, //in milliseconds
    sameSite: 'strict',
  },
});
