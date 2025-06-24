import { Worker } from "bullmq";
import { redis } from "../../../config/redisClient";

const cacheWorker = new Worker(
  "cacheQueue",
  async (job) => {
    const { pattern } = job.data;
    await validateCache(pattern);
  },
  {
    connection: redis,
    concurrency: 5, // Set concurrency to 5 to limit the number of workers processing jobs at once
  }
);

cacheWorker.on("completed", (job) => {
  console.log(`Job ${job.id} completed.`);
});

cacheWorker.on("failed", (job, err) => {
  console.log(`Job ${job?.id} failed: ${err.message}!`);
});

const validateCache = async (pattern: string) => {
  try {
    const stream = redis.scanStream({
      match: pattern,
      count: 100, // Adjust count as needed for performance
    });

    const pipeline = redis.pipeline();
    let totalKeys = 0;

    // process keys in batches
    stream.on("data", (keys: string[]) => {
      if (keys.length > 0) {
        keys.forEach((key) => {
          pipeline.del(key);
          totalKeys++;
        });
      }
    });

    //warp stream event in promise
    await new Promise<void>((resolve, reject) => {
      stream.on("end", async () => {
        try {
          if (totalKeys > 0) {
            await pipeline.exec();
            console.log(`Invalidated ${totalKeys} keys`);
          }
          resolve();
        } catch (exeError) {
          reject(exeError);
        }
      });

      stream.on("error", (error) => {
        reject(error);
      });
    });
  } catch (CacheError) {
    console.log(`Error validating cache for pattern:`, CacheError);
    throw CacheError;
  }
};
