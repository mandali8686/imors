const express = require("express");
const router = express.Router();
const videoController = require("../controllers/video");

router.get("/:songId", videoController.getSongVideos);

module.exports = router;
