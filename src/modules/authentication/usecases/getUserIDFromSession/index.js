const redisClient = require('./../../../session/redis.js');
const GetUserIDFromSession = require('./getUserIDFromSession.js');
const GetUserIDFromSessionController = require('./getUserIDFromSessionController.js');

const getUserIDFromSession = new GetUserIDFromSession(redisClient);

const getUserIDFromSessionController = new GetUserIDFromSessionController(getUserIDFromSession);

module.exports = getUserIDFromSessionController;
