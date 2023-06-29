const app = require('./setup/express.js');
const logging = require('./setup/logging.js');
const database = require('./setup/database.js');
const { redisConnect } = require('./setup/redis.js');

logging();
database();
redisConnect();

module.exports = app;
