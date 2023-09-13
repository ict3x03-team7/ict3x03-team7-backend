const express = require('express');
const cors = require('cors');
const equipmentRouter = require('./infra/http/routes/equipment');
const userRouter = require('./infra/http/routes/user');
const dummyRouter = require('./infra/http/routes/dummy');
const patrickstar = require('./infra/http/routes/patrickStar');
const morgan = require('morgan');
const helmet = require('helmet');

const app = express();

app.use(
  cors({
    origin: 'http://127.0.0.1',
  }),
);

app.use(helmet());
app.use(morgan('dev'));
app.use(express.json('50mb'));

app.use('/user', userRouter);
app.use('/equipment', equipmentRouter);
app.use('/dummy', dummyRouter);
app.use('/patrickstar', patrickstar);

module.exports = app;
