const express = require('express');
const authRouter = express.Router();
const loginController = require('./../../../modules/authentication/usecases/login/index');
const mfaVerifyController = require('./../../../modules/authentication/usecases/mfaVerify/index');
const mfaEnableController = require('./../../../modules/authentication/usecases/mfaEnable/index');
const logoutController = require('./../../../modules/authentication/usecases/logout/index');
const {
  checkAuthentication,
} = require('./../../../modules/authentication/services/AuthenticationService');

authRouter.post('/login', async (req, res) => {
  loginController.execute(req, res);
});

authRouter.use(checkAuthentication);

authRouter.post('/verify', async (req, res) => {
  mfaVerifyController.execute(req, res);
});

authRouter.put('/enable', async (req, res) => {
  mfaEnableController.execute(req, res);
});

authRouter.post('/logout', async (req, res) => {
  logoutController.execute(req, res);
});

module.exports = authRouter;
