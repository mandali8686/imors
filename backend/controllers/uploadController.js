// backend/controllers/uploadController.js
exports.uploadFile = (req, res) => {
    if (!req.file) {
      return res.status(400).send({ message: 'Please upload a file.' });
    }
    res.send({
      message: 'File uploaded successfully.',
      fileName: req.file.filename,
      filePath: req.file.path
    });
  };
  exports.uploadFile = (req, res) => {
    console.log(req.file); // 查看文件信息
    if (!req.file) {
      return res.status(400).send({ message: 'Please upload a file.' });
    }
    // 其余处理...
};