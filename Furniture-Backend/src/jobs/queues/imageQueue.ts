import { Queue } from "bullmq";
import { redis } from "../../../config/redisClient";

const ImageQueue = new Queue("optimizeImage", {
  connection: redis,
});

export default ImageQueue;
