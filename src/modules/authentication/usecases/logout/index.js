const LogoutController = require('./logoutController.js');
const redisClient = require('./../../../session/redis.js');
const Logout = require('./logout.js');

const logout = new Logout(redisClient);
const logoutController = new LogoutController(logout);

module.exports = logoutController;
