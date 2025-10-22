import Redis from "ioredis";

let redisClient;

if (!global.redisClient) {
  redisClient = new Redis(process.env.REDIS_URL); // Upstash or your Redis URL
  global.redisClient = redisClient;
} else {
  redisClient = global.redisClient;
}

export default redisClient;