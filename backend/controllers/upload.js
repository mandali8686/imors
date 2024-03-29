const multer = require('multer');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

exports.uploadSongHandler = (req, res) => {
    console.log('File uploaded:', req.file);

    res.json({ message: 'File uploaded successfully' });
};

exports.upload = upload;
