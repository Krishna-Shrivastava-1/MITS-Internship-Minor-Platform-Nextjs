import Redis from "ioredis";

let redisClient;

if (!global.redisClient) {
  // Create new connection only once (prevents multiple connections in dev hot reload)
  global.redisClient = new Redis(process.env.REDIS_URL, {
    tls: process.env.REDIS_URL?.startsWith("rediss://") ? {} : undefined, // for Upstash or secure Redis
  });
}

redisClient = global.redisClient;

export default redisClient;
