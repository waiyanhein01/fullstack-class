import { Worker } from "bullmq";
import path from "path";
import sharp from "sharp";

const connection = {
  host: process.env.QUEUES_HOST,
  port: parseInt(process.env.QUEUES_PORT!),
};

const ImageWorker = new Worker(
  "optimizeImage",
  async (jobs) => {
    const { filePath, fileName } = jobs.data;

    const optimizedImagePath = path.join(
      __dirname,
      `../../../uploads/optimized/${fileName}`
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
  console.log(`Job ${job.id} completed`);
});

ImageWorker.on("failed", (job, err) => {
  console.log(`Job ${job?.id} failed: ${err.message}`);
});
