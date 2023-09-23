const express = require('express');
const userRouter = express.Router();
const getUserController = require('./../../../modules/user/usecases/getUser/index');
const {
  checkAuthentication,
} = require('./../../../modules/authentication/services/AuthenticationService');

userRouter.use(checkAuthentication);

userRouter.get('/:userID', async (req, res) => {
  getUserController.execute(req, res);
});

module.exports = userRouter;
