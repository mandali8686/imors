const { Worker } = require("bullmq");
const { spawn } = require("child_process");
const path = require("path");
const Song = require("../models/song");
const { bucket } = require("../firebase-config");
const sendEmail = require('../utils/mailer');

import User from "../models/user";


const songWorker = new Worker(
  "songProcessing",
  async (job) => {
    const { filename, filePath, modelName, userId, songId, videoId } = job.data;
    const outputFilePath = path.join(__dirname, "output", `${filename}.mp4`);
    const stylePath = path.join("C:\\lucid-sonic-dreams", `${modelName}.pkl`);
    const scriptPath = path.join(__dirname, "script.py");

    // Specify the path to the Anaconda environment's Python executable
    const anacondaEnvPath =
      "C:\\Users\\yduze\\anaconda3\\envs\\stylegan\\python";

    console.log(`Python Path: ${anacondaEnvPath}`);
    console.log(`Script Path: ${scriptPath}`);
    console.log(`Model Path: ${stylePath}`);
    console.log(`File Path: ${filePath}`);

    // Use spawn to run the Python script using the Python executable from the Anaconda environment
    const command = anacondaEnvPath;
    const args = [scriptPath, filePath, outputFilePath, stylePath];

    const process = spawn(command, args, { shell: true });

    process.stdout.on("data", (data) => {
      console.log(`Progress update: ${data.toString()}`);
    });

    process.stderr.on("data", (data) => {
      console.error(`Error: ${data.toString()}`);
    });

    process.on("close", async (code) => {
      if (code === 0) {
        console.log(
          `Processing song with ID: ${job.id} completed successfully`
        );

        const firebase_destination = `${userId}/${songId}/${videoId}.mp4`;

        try {
          await bucket.upload(outputFilePath, {
            destination: firebase_destination,
            public: true, // if you want the file to be publicly accessible
          });

          console.log(
            `File uploaded to Firebase Storage at ${firebase_destination}`
          );

          // Send email
          try {
            const user = User.findbyId(userId);
            console.log("Sending email to ", user.email);
            const emailInfo = sendEmail(user.email);
            console.log("Email sent successfully:", emailInfo);
          } catch(error) {
            console.error('Failed to send email');
          }
          
        } catch (error) {
          console.error(
            `Failed to upload file to Firebase Storage: ${error.message}`
          );
        }
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

module.exports = { songWorker };
