const express = require('express');
const router = express.Router();
const { uploadSongHandler, upload } = require('../controllers/upload');

router.post('/', upload.single('song'), uploadSongHandler);

module.exports = router;
