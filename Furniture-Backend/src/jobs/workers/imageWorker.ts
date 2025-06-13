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
    const { filePath, fileName, width, height, quality } = job.data;

    const optimizedImagePath = path.join(
      __dirname,
      "../../../",
      "uploads/optimized",
      fileName
    );

    await sharp(filePath)
      .resize(width, height)
      .webp({ quality: quality })
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
