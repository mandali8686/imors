const { getDownloadURL, ref } = require("firebase/storage");
const { bucket } = require("../firebase-config");
const fs = require("fs");
const https = require("https");
const Song = require("../models/song");
const Video = require("../models/video");
const path = require("path");
const os = require("os");
const { getUserFromRequest } = require("../utils/auth");
const { Queue } = require("bullmq");

// Set up BullMQ queue
const songQueue = new Queue("songProcessing", {
  connection: {
    host: "localhost",
    port: 6379,
    password: "Password@1",
  },
});

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

exports.generateVideo = async (req, res, next) => {
  try {
    console.log("Starting the video generation process.");
    const user = await getUserFromRequest(req);
    console.log("VIDEOUSER", user);
    if (!user) {
      console.log("User not found!");
      return res.status(404).json({ message: "User not found!" });
    }

    console.log("User found:", user._id);
    const songId = req.body.songId;
    const song = await Song.findOne({ _id: songId });
    if (!song) {
      console.log("Song not found with ID:", songId);
      return res.status(404).json({ message: "Song not found!" });
    }

    console.log("Song found:", song.title);
    const model = req.body.model;
    const video = new Video({ song: song._id, model: model });
    await video.save();
    console.log("Video entry created in database.");

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
      song.owner.toString(),
      song._id.toString(),
      "videos"
    );
    console.log("Video directory path:", videoDirectory);
    await fs.promises.mkdir(videoDirectory, { recursive: true });
    console.log("Video directory ensured.");

    const audioFilePath = path.join(videoDirectory, song._id + ".mp3");
    console.log("Audio file path:", audioFilePath);

    // Download and save the audio file locally using the enhanced function
    await downloadFile(url, audioFilePath);
    console.log("Audio file downloaded and saved successfully.");

    console.log("SENDING USER ID:", song.owner);
    // Add the video generation task to the queue
    await songQueue.add("processSong", {
      filename: "video",
      filePath: audioFilePath,
      modelName: model,
      userId: song.owner,
      songId: songId,
      videoId: video._id,
      userEmail: user.email,
    });
    console.log("Video generation task queued.");

    res.status(200).json({
      message: "Video is queued",
      song: song,
    });
  } catch (err) {
    console.error("Error in generateVideo function:", err);
    res.status(500).json({
      message: "Failed to queue video!",
      error: err.message,
    });
  }
};

exports.getVideoURLs = async (req, res) => {
  const user = await getUserFromRequest(req);
  if (!user) {
    return res.status(404).json({ message: "User not found!" });
  }

  const songId = req.query.songId;
  const song = await Song.findOne({ _id: songId });
  if (!song) {
    return res.status(404).json({ message: "Song not found!" });
  }

  const directory = `${song.owner}/${song._id}/`;

  try {
    const options = { prefix: directory };
    const [files] = await bucket.getFiles(options);
    const videoURLPromises = files
      .filter((file) => !file.name.endsWith(song._id))
      .map((file) =>
        file.getSignedUrl({
          action: "read",
          expires: "03-09-2491",
        })
      );

    const videoURLs = await Promise.all(videoURLPromises);
    const urls = videoURLs.map((urlArray) => urlArray[0]);
    res.json(urls);
  } catch (error) {
    console.error("Error fetching video URLs:", error);
    res.status(500).json({ message: "Failed to fetch video URLs" });
  }
};
