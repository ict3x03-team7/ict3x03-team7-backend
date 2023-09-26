const express = require('express');
const authRouter = express.Router();
const loginController = require('./../../../modules/authentication/usecases/login/index');
const mfaLoginController = require('./../../../modules/authentication/usecases/mfaLogin/index');
const {
  checkAuthentication,
} = require('./../../../modules/authentication/services/AuthenticationService');

authRouter.post('/login', async (req, res) => {
  loginController.execute(req, res);
});

authRouter.use(checkAuthentication);

authRouter.post('/verify', async (req, res) => {
  mfaLoginController.execute(req, res);
});

module.exports = authRouter;
