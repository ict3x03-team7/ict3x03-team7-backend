const express = require('express');
const authRouter = express.Router();
const loginController = require('./../../../modules/authentication/usecases/login/index');

authRouter.post('/login', async (req, res) => {
  loginController.execute(req, res);
  if (res.statusCode == 200) {
    console.log('Login success');
  }
});

authRouter.post('/:userID/2FA/verify', async (req, res) => {
  console.log('In validating 2FA');
});

module.exports = authRouter;
