const express = require('express');
const authRouter = express.Router();
const loginController = require('./../../../modules/authentication/usecases/login/index');

authRouter.post('/login', async (req, res) => {
  loginController.execute(req, res);
});

module.exports = authRouter;
