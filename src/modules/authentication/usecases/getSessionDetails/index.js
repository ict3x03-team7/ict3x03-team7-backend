const redisClient = require('../../../session/redis.js');
const GetSessionDetails = require('./getSessionDetails.js');
const GetSessionDetailsController = require('./getSessionDetailsController.js');

const getSessionDetails = new GetSessionDetails(redisClient);

const getSessionDetailsController = new GetSessionDetailsController(getSessionDetails);

module.exports = getSessionDetailsController;
