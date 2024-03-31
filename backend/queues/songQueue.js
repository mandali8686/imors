const { Queue } = require("bullmq");

const songQueue = new Queue("songProcessing", {
  connection: {
    host: "localhost",
    port: 6379,
  },
});

module.exports = songQueue;
