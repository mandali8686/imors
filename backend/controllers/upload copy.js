const multer = require("multer");
const songQueue = require("../queues/songQueue");
const path = require("path");

// Set up multer to store files on disk
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Adjust the path as needed
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage: storage });

const uploadSongHandler = async (req, res) => {
  console.log("In uploadSongHandler......................");
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded." });
  }
  try {
    console.log("Adding job to queue with filename:", req.file.originalname);
    await songQueue.add("processSong", {
      filename: req.file.originalname,
      filePath: path.join(__dirname, "../uploads", req.file.originalname), // Adjust the path as needed
    });

    res.json({ message: "File uploaded and added to processing queue." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error adding to processing queue." });
  }
};

module.exports = { upload, uploadSongHandler };
