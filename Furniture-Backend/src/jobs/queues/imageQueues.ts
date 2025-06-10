import { Queue } from "bullmq";

const connection = {
  host: process.env.QUEUES_HOST,
  port: parseInt(process.env.QUEUES_PORT!),
};

const ImageQueue = new Queue("optimizeImage", {
  connection,
});

export default ImageQueue;
