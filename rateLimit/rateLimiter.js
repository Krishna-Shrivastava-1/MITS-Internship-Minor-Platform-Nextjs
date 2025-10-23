import { RateLimiterRedis } from "rate-limiter-flexible";
import redisClient from "./redisRateLimiterInstance";

export const loginRateLimiter = new RateLimiterRedis({
  storeClient: redisClient,
  keyPrefix: "login_rl",
  points: 5,              // 5 requests allowed
  duration: 15 * 60,      // per 15 minutes
  blockDuration: 15 * 60, // block for 15 min if exceeded
});
