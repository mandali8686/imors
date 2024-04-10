const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });
const { storage } = require("../firebase-config.js");
const { ref, uploadBytes, getDownloadURL } = require("firebase/storage");
const Song = require("../models/song.js");
const User = require("../models/user.js"); // Make sure to import the User model
const Session = require("../models/session.js"); // Make sure to import the Session model
const { deleteObject } = require("firebase/storage"); 


exports.createSong = async (req, res, next) => {
  try {
    // Get the session ID from the cookie
    const sessionId = req.cookies.sessionId;
    const session = await Session.findOne({ sessionId: sessionId });
    if (!session) {
      return res.status(404).json({
        message: "Session not found!",
      });
    }

    // Check file
    if (!req.file) {
      return res.status(400).json({
        message: "No audio file provided!",
      });
    }

    // Upload the song to firebase
    const audioFile = req.file;

    // Get the user
    const user = await User.findById(session.userId);
    if (!user) {
      return res.status(404).json({
        message: "User not found!",
      });
    }

    const song = new Song({
      title: audioFile.originalname,
      owner: user._id,
    });

    const fileRef = ref(
      storage,
      `${user._id}/${song._id}/${audioFile.originalname}`
    );

    await uploadBytes(fileRef, audioFile.buffer);

    // Save song to MongoDB
    await song.save();

    return res.status(200).json({
      message: "Song created successfully!",
      song: song,
    });
  } catch (err) {
    console.log(err);
    // Send a single error response here
    return res.status(500).json({
      message: "Failed to create song!",
      error: err.message,
    });
  }
};

exports.getUserSongs = async (req, res, next) => {
  try {
    // Get the session ID from the cookie
    const sessionId = req.cookies.sessionId;
    const session = await Session.findOne({ sessionId: sessionId });
    if (!session) {
      return res.status(404).json({
        message: "Session not found!",
      });
    }

    // Get the user
    const user = await User.findById(session.userId);
    if (!user) {
      return res.status(404).json({
        message: "User not found!",
      });
    }

    // Find all songs belonging to the user
    const songs = await Song.find({ owner: user._id });

    return res.status(200).json({
      message: "Songs retrieved successfully!",
      songs: songs,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Failed to retrieve songs!",
      error: err.message,
    });
  }
};



exports.getSongFile = async (req, res, next) => {
  try {
    const songId = req.params.songId;
    const song = await Song.findById(songId);

    if (!song) {
      return res.status(404).json({
        message: "Song not found!",
      });
    }

    // Get the session ID from the cookie
    const sessionId = req.cookies.sessionId;
    const session = await Session.findOne({ sessionId: sessionId });
    if (!session) {
      return res.status(404).json({
        message: "Session not found!",
      });
    }

    // Get the user
    const user = await User.findById(session.userId);
    if (!user) {
      return res.status(404).json({
        message: "User not found!",
      });
    }

    // Check if the user owns the song
    if (song.owner.toString() !== user._id.toString()) {
      return res.status(403).json({
        message: "You do not have permission to access this song!",
      });
    }

    // Create a reference to the file in Firebase Storage
    const fileRef = ref(storage, `audioFiles/${user._id}/${song.title}`);

    // Get the download URL for the file
    const downloadUrl = await getDownloadURL(fileRef);

    // Redirect the user to the download URL
    res.redirect(downloadUrl);
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Failed to retrieve song file!",
      error: err.message,
    });
  }
};

// controllers/song.js



exports.deleteSong = async (req, res) => {
  try {
    const songId = req.params.songId;
    const song = await Song.findById(songId);
    if (!song) {
      return res.status(404).json({ message: "Song not found!" });
    }

    
    const sessionId = req.cookies.sessionId;
    const session = await Session.findOne({ sessionId: sessionId });
    if (!session) {
      return res.status(404).json({ message: "Session not found!" });
    }
    const user = await User.findById(session.userId);
    if (!user || song.owner.toString() !== user._id.toString()) {
      return res.status(403).json({ message: "Unauthorized to delete this song." });
    }

    const fileRef = ref(storage, `audioFiles/${user._id}/${song.title}`);
    try {
      await deleteObject(fileRef);
    } catch (err) {
      if (err.code === 'storage/object-not-found') {
        
        console.log(`File not found in Firebase Storage, but proceeding with deletion from database: ${err.message}`);
      } else {
        
        throw err;
      }
    }

   
    await Song.findByIdAndDelete(songId);
    res.json({ message: "Song deleted successfully." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to delete song.", error: err.message });
  }
};


