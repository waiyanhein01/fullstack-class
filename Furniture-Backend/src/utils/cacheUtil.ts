import { redis } from "../../config/redisClient";

export const getOrSetCache = async (key: any, cb: any) => {
  try {
    const cachedData = await redis.get(key);
    if (cachedData) {
      console.log("Cache hit");
      return JSON.parse(cachedData);
    } else {
      console.log("Cache miss");
      const refreshData = await cb();
      await redis.setex(key, 3600, JSON.stringify(refreshData)); // Set cache with 1 hour expiration
      return refreshData;
    }
  } catch (error) {
    console.error("Error in getOrSetCache:", error);
    throw error;
  }
};
