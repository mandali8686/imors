const { Worker } = require("bullmq");
const { spawn } = require("child_process");
const path = require("path");
const Song = require("../models/song");
const { bucket } = require("../firebase-config");
const { sendEmail } = require("../utils/mailer");

const User = require("../models/user");

// Function to download file using HTTPS and save locally
function downloadFile(url, destPath) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(destPath);

    https
      .get(url, (response) => {
        if (response.statusCode !== 200) {
          file.close();
          fs.unlink(destPath, () => {}); // Delete the file async. (No need to wait)
          reject(
            `Server responded with ${response.statusCode}: ${response.statusMessage}`
          );
          return;
        }

        response.pipe(file);

        file.on("finish", () => {
          file.close();
          resolve();
        });
      })
      .on("error", (err) => {
        file.close();
        fs.unlink(destPath, () => {}); // Delete the file async. (No need to wait)
        reject(err.message);
      });

    file.on("error", (err) => {
      // Handle errors on file write
      file.close();
      fs.unlink(destPath, () => {}); // Delete the file async. (No need to wait)
      reject(err.message);
    });
  });
}

const songWorker = new Worker(
  "songProcessing",
  async (job) => {
    const { filename, modelName, userId, song, videoId, userEmail } = job.data;

    const fileRef = bucket.file(`${song.owner}/${song._id}/${song._id}`);
    console.log("***************FILEREF:", fileRef);
    const [url] = await fileRef.getSignedUrl({
      action: "read",
      expires: "03-09-2491",
    });
    console.log("Download URL obtained:", url);

    const videoDirectory = path.join(
      "C:",
      "Users",
      "yduze",
      "songs",
      song.owner,
      song._id,
      "videos"
    );
    console.log("Video directory path:", videoDirectory);
    await fs.promises.mkdir(videoDirectory, { recursive: true });
    console.log("Video directory ensured.");

    const audioFilePath = path.join(videoDirectory, song._id + ".mp3");
    console.log("Audio file path:", audioFilePath);

    await downloadFile(url, audioFilePath);
    console.log("Audio file downloaded and saved successfully.");

    const outputFilePath = path.join(__dirname, "output", `${filename}.mp4`);
    const stylePath = path.join("C:\\lucid-sonic-dreams", `${modelName}.pkl`);
    const scriptPath = path.join(__dirname, "script.py");

    // Specify the path to the Anaconda environment's Python executable
    const anacondaEnvPath =
      "C:\\Users\\yduze\\anaconda3\\envs\\stylegan\\python";

    console.log(`Python Path: ${anacondaEnvPath}`);
    console.log(`Script Path: ${scriptPath}`);
    console.log(`Model Path: ${stylePath}`);
    console.log(`File Path: ${audioFilePath}`);

    // Use spawn to run the Python script using the Python executable from the Anaconda environment
    const command = anacondaEnvPath;
    const args = [scriptPath, audioFilePath, outputFilePath, stylePath];

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
            console.log(userId);
            // const user = await User.findById(userId);
            console.log("Sending email to ", userEmail);
            const emailInfo = await sendEmail(userEmail);
            console.log("Email sent successfully:", emailInfo);
          } catch (error) {
            console.error("Failed to send email", error);
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
      host: "44.212.76.87",
      port: 6379,
      password: "Password@1",
    },
  }
);

module.exports = { songWorker };
