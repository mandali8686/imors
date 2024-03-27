const express = require("express");
const router = express.Router();
const userController = require("../controllers/user");
const upload = require('../controllers/upload');

const { validateSession } = require('../controllers/session'); 
const { checkBodyForLongValues, validateAndFormatEmailParams, validatePasswordForm } = require('../controllers/filter'); 

router.use(checkBodyForLongValues, validateAndFormatEmailParams);

router.post('', validatePasswordForm, userController.createUser);
router.use(validateSession);
router.get('', userController.getUserByEmail);
router.put('/updateUsername', userController.updateUsername);
router.put('/changePassword', userController.changePasswordByEmail);
router.delete('', userController.deleteUser);

router.post('/uploadSong', upload.single('song'), (req, res, next) => {
    if (!req.file) {
      return res.status(400).send('No file uploaded.');
    }
   
    userController.uploadSong(req, res, next);
  });
  

module.exports = router;