const redis = require('redis');
const dotenv = require('dotenv');
dotenv.config();

//configure redis
const redisClient = redis.createClient({
  url: process.env.REDIS_URL,
  password: process.env.REDIS_PASSWORD,
});
redisClient.connect().catch(console.error);

module.exports = redisClient;
