const { getDownloadURL, listAll, ref } = require("firebase/storage");
const { getUserFromRequest, verifyUserOwnership } = require("../utils/auth");
const { getVideoPathForSong } = require("../utils/firebase");
const { queueVideoGeneration } = require("../workers/songWorker_final");
const Song = require("../models/song");
const Video = require("../models/video");
const path = require("path");
const { Worker, Queue } = require("bullmq");
const fs = require("fs/promises");
const os = require("os");

// Set up BullMQ queue
const songQueue = new Queue("songProcessing", {
  connection: {
    host: "localhost",
    port: 6379,
  },
});

exports.generateVideo = async (req, res, next) => {
  console.log(req.body);

  try {
    const user = await getUserFromRequest(req);
    if (!user) {
      return res.status(404).json({
        message: "User not found!",
      });
    }

    const songId = req.body.songId;
    const song = await Song.findOne({ _id: songId });
    if (!song) {
      return res.status(404).json({
        message: "Song not found!",
      });
    }

    const model = req.body.model;
    const video = new Video({
      song: song._id,
    });

    await video.save();

    const videoDirectory = path.join(
      os.homedir(),
      "VideoUploads",
      song.owner.toString(),
      song._id.toString(),
      "videos"
    );

    // Create the directory if it does not exist
    await fs.mkdir(videoDirectory, { recursive: true });

    const audioFilePath = path.join(
      videoDirectory,
      song._id.toString() + ".mp3"
    ); // Assuming the audio file format is .mp3

    // Add the video generation task to the queue
    await songQueue.add("processSong", {
      filename: "video",
      filePath: audioFilePath,
      modelName: model,
    });

    res.status(200).json({
      message: "Video is queued",
      song: song,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Failed to queue video!",
      error: err.message,
    });
  }
};

exports.getSongVideos = async (req, res, next) => {
  try {
    const songId = req.params.songId;
    const user = await getUserFromRequest(req);

    if (!user) {
      return res.status(404).json({
        message: "User not found!",
      });
    }

    const song = await Song.findOne({ _id: songId, owner: user._id });

    if (!song) {
      return res.status(404).json({
        message: "Song not found!",
      });
    }

    if (!verifyUserOwnership(user, song)) {
      return res.status(404).json({
        message: "Song ownership could not be verified!",
      });
    }

    const videoDirectoryRef = ref(storage, getVideoPathForSong(song));
    const videoFiles = await listAll(videoDirectoryRef);

    const videoUrls = await Promise.all(
      videoFiles.items.map((itemRef) => getDownloadURL(itemRef))
    );

    return res.status(200).json({ videos: videoUrls });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ message: "Failed to retrieve videos!", error: err.message });
  }
};
