const mongoose = require("mongoose");

const videoSchema = mongoose.Schema({
  song: { type: mongoose.Schema.Types.ObjectId, ref: "Song", required: true },
});

module.exports = mongoose.model("Video", videoSchema);
