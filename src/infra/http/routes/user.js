const express = require('express');
const userRouter = express.Router();
const getUserController = require('./../../../modules/user/usecases/getUser/index');
const createUserController = require('./../../../modules/user/usecases/createUser/index');
const updatePasswordController = require('./../../../modules/user/usecases/updatePassword/index');
const {
  checkAuthentication,
} = require('./../../../modules/authentication/services/AuthenticationService');

userRouter.post('/', async (req, res) => {
  createUserController.execute(req, res);
});

userRouter.use(checkAuthentication);

userRouter.get('/:userID', async (req, res) => {
  getUserController.execute(req, res);
});

userRouter.put('/:userID/updatePassword', async (req, res) => {
  updatePasswordController.execute(req, res);
});

module.exports = userRouter;
