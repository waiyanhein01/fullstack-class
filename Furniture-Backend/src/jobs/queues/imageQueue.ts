import { Queue } from "bullmq";

const connection = {
  host: process.env.REDIS_HOST,
  port: 6379,
};

const ImageQueue = new Queue("optimizeImage", {
  connection,
});

export default ImageQueue;
