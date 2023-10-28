const redis = require('redis');
const dotenv = require('dotenv');
dotenv.config();

//configure redis
const redisClient = redis.createClient({
  url: `redis://localhost:${process.env.REDIS_PORT}`,
  password: process.env.REDIS_PASSWORD,
});
redisClient.connect().catch(console.error);

module.exports = redisClient;
