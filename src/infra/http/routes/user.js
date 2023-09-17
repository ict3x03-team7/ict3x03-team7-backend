const express = require('express');
const userRouter = express.Router();
const getUserController = require('./../../../modules/user/usecases/getUser/index');

userRouter.get('/', async (req, res) => {
  res.json({ message: 'You are a user' });
});

userRouter.get('/:userID', async (req, res) => {
  getUserController.execute(req, res);
});

module.exports = userRouter;
