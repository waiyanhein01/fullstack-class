import { Worker } from "bullmq";
import path from "path";
import sharp from "sharp";

const connection = {
  host: process.env.REDIS_HOST,
  port: 6379,
};

const ImageWorker = new Worker(
  "optimizeImage",
  async (job) => {
    const { filePath, fileName } = job.data;

    const optimizedImagePath = path.join(
      __dirname,
      "../../../",
      "uploads/optimized",
      fileName
    );

    await sharp(filePath)
      .resize(200, 200)
      .webp({ quality: 50 })
      .toFile(optimizedImagePath);
  },
  {
    connection,
  }
);

ImageWorker.on("completed", (job) => {
  console.log(`Job ${job.id} completed.`);
});

ImageWorker.on("failed", (job, err) => {
  console.log(`Job ${job?.id} failed: ${err.message}!`);
});
