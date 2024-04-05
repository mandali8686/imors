const multer = require("multer");
const { Worker } = require("bullmq");
const { spawn } = require("child_process");
const path = require("path");

// Set up multer to store files on disk
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage: storage });

// Worker to process the song
const songWorker = new Worker(
  "songProcessing",
  async (job) => {
    const { filename, filePath, modelName } = job.data;
    const outputFilePath = path.join(__dirname, "output", `${filename}.mp4`);
    const stylePath = `C:\\model-testing\\lucid-sonic-dreams\\${modelName}.pkl`;
    const scriptPath = path.join(__dirname, "script.py");

    // Define the command to activate the environment and run the script
    const command = `"C:\\Users\\yduze\\anaconda3\\Scripts\\activate.bat" sonicstylegan-pt && python ${scriptPath} ${filePath} ${outputFilePath} ${stylePath}`;

    // Split the command into arguments for spawn
    const args = command.split(" ");

    // Use spawn to execute the command and capture stdout
    const process = spawn(args.shift(), args, { shell: true });

    process.stdout.on("data", (data) => {
      console.log(`Progress update: ${data.toString()}`);
    });

    process.stderr.on("data", (data) => {
      console.error(`Error: ${data.toString()}`);
    });

    process.on("close", (code) => {
      if (code === 0) {
        console.log(
          `Processing song with ID: ${job.id} completed successfully`
        );
      } else {
        console.error(
          `Processing song with ID: ${job.id} failed with code ${code}`
        );
      }
    });
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

module.exports = { upload };
