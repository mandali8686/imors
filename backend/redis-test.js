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
