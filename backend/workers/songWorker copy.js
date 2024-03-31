const { Worker } = require("bullmq");
const { exec } = require("child_process");
const path = require("path");

const songWorker = new Worker(
  "songProcessing",
  async (job) => {
    const { filename, filePath } = job.data; // Use filePath instead of buffer
    const outputFilePath = path.join(__dirname, "output", `${filename}.mp4`);
    const stylePath = "C:\\model-testing\\lucid-sonic-dreams\\mapdreamer.pkl";
    const scriptPath = path.join(__dirname, "script.py");

    // Define the command to activate the environment and run the script
    const command = `"C:\\Users\\yduze\\anaconda3\\Scripts\\activate.bat" sonicstylegan-pt && python ${scriptPath} ${filePath} ${outputFilePath} ${stylePath}`;

    // Execute the command
    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error processing song: ${error}`);
        return;
      }
      console.log(`Song processed: ${stdout}`);
    });

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
