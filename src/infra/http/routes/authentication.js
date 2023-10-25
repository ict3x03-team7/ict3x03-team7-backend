const express = require('express');
const authRouter = express.Router();
const loginController = require('./../../../modules/authentication/usecases/login/index');
const mfaVerifyController = require('./../../../modules/authentication/usecases/mfaVerify/index');
const mfaVerifyLoginController = require('./../../../modules/authentication/usecases/mfaVerifyLogin/index');
const mfaEnableController = require('./../../../modules/authentication/usecases/mfaEnable/index');
const logoutController = require('./../../../modules/authentication/usecases/logout/index');
const getUserIDFromSessionController = require('./../../../modules/authentication/usecases/getUserIDFromSession/index');
const verifyEmailController = require('./../../../modules/authentication/usecases/verifyEmail/index');
const resetPasswordController = require('./../../../modules/authentication/usecases/resetPassword/index');
const {
  checkAuthentication,
  loginAttempt,
} = require('./../../../modules/authentication/services/AuthenticationService');

authRouter.post('/login', loginAttempt, async (req, res) => {
  loginController.execute(req, res);
});

authRouter.post('/login/verify', async (req, res) => {
  mfaVerifyLoginController.execute(req, res);
});

authRouter.post('/:email/verify', async (req, res) => {
  verifyEmailController.execute(req, res);
});

authRouter.post('/resetpassword', async (req, res) => {
  resetPasswordController.execute(req, res);
});

authRouter.post('/verify', async (req, res) => {
  mfaVerifyController.execute(req, res);
});

authRouter.use(checkAuthentication);

authRouter.put('/enable', async (req, res) => {
  mfaEnableController.execute(req, res);
});

authRouter.get('/userID', async (req, res) => {
  getUserIDFromSessionController.execute(req, res);
});

authRouter.post('/logout', async (req, res) => {
  logoutController.execute(req, res);
});

module.exports = authRouter;
