const express = require('express');
const userRouter = express.Router();
const getUserController = require('./../../../modules/user/usecases/getUser/index');
const createUserController = require('./../../../modules/user/usecases/createUser/index');
const updatePasswordController = require('./../../../modules/user/usecases/updatePassword/index');
const deleteUserController = require('./../../../modules/user/usecases/deleteUser/index');
const getAllUsersController = require('./../../../modules/user/usecases/getAllUsers/index');
const unlockUserController = require('./../../../modules/user/usecases/unlockUser/index');
const {
  checkAuthentication,
  checkAdminPrivileges,
  checkAuthorization,
} = require('./../../../modules/authentication/services/AuthenticationService');

userRouter.post('/', async (req, res) => {
  createUserController.execute(req, res);
});

userRouter.use(checkAuthentication);

userRouter.get('/all', checkAdminPrivileges, async (req, res) => {
  getAllUsersController.execute(req, res);
});

userRouter.put('/:userID/unlock', checkAdminPrivileges, async (req, res) => {
  unlockUserController.execute(req, res);
});

userRouter.get('/:userID', checkAuthorization, async (req, res) => {
  getUserController.execute(req, res);
});

userRouter.put('/:userID/updatePassword', checkAuthorization, async (req, res) => {
  updatePasswordController.execute(req, res);
});

userRouter.delete('/:userID', checkAuthorization, async (req, res) => {
  deleteUserController.execute(req, res);
});

userRouter.delete('/admin/:userID', checkAdminPrivileges, async (req, res) => {
  deleteUserController.execute(req, res);
});

module.exports = userRouter;
