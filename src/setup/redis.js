const redis = require("redis");
const { REDIS_URL } = require("../config/env");

const redisClient = redis.createClient({url: REDIS_URL});

async function redisConnect() {
  redisClient.on("error", (err) => console.log("Redis Client Error", err));
  await redisClient.connect();
}

redisClient.on("connect", function () {
  console.log(`connected to redis`);
});

module.exports = {
  redisClient,
  redisConnect,
};
