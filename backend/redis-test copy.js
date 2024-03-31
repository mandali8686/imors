const { Queue } = require("bullmq");

const queue = new Queue("testQueue", {
  connection: {
    host: "localhost",
    port: 6379,
  },
});

async function addJob() {
  try {
    const job = await queue.add("testJob", { message: "Hello, BullMQ!" });
    console.log("Job added to the queue:", job.id);
  } catch (error) {
    console.error("Error adding job to the queue:", error);
  }
}

addJob();

// TERMINAL OUTPUT
// PS C:\Users\yduze\OneDrive\Masaüstü\repo_latest\imors\backend> node redis-test.js
// It is highly recommended to use a minimum Redis version of 6.2.0
//            Current: 6.0.16
// Job added to the queue: 1
