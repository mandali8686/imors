const { Worker } = require("bullmq");

const songWorker = new Worker(
  "songProcessing",
  async (job) => {
    // Replace with your GAN AI algorithm processing
    console.log(`Processing song with ID: ${job.id}`);
  },
  {
    connection: {
      host: "localhost",
      port: 6379,
    },
  }
);

songWorker.on("completed", (job) => {
  console.log(`Job completed with ID: ${job.id}`);
});

songWorker.on("failed", (job, err) => {
  console.error(`Job failed with ID: ${job.id}`, err);
});

module.exports = songWorker;
