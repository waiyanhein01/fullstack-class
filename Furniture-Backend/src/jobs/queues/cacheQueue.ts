import { Queue } from "bullmq";
import { redis } from "../../../config/redisClient";

const cacheQueue = new Queue("cacheQueue", {
  connection: redis,
  defaultJobOptions: {
    attempts: 3,
    backoff: {
      type: "exponential",
      delay: 1000, // Initial delay of 1 second
    },
    removeOnComplete: true, // Remove completed jobs from the queue
    removeOnFail: true, // Remove failed jobs from the queue
  },
});

export default cacheQueue;
