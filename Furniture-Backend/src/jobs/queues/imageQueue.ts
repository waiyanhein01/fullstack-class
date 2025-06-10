import { Queue } from "bullmq";

const connection = {
  host: process.env.REDIS_HOST,
  port: parseInt(process.env.REDIS_PORT!),
};

const ImageQueue = new Queue("optimizeImage", {
  connection,
});

export default ImageQueue;
