const express = require("express");
const router = express.Router();
const userController = require("../controllers/user");
const { validateSession } = require('../controllers/session'); 
const { checkBodyForLongValues, validateAndFormatEmailParams, validatePasswordForm } = require('../controllers/filter'); 

router.use(checkBodyForLongValues, validateAndFormatEmailParams);

router.post('', validatePasswordForm, userController.createUser);
router.get('', userController.getUserByEmail);

router.use(validateSession);

router.put('/:id', userController.updateUser);
router.put('/updateUsername', userController.updateUsername);
router.get('/:id', userController.getUserById);
// router.get('', userController.getUsers);
router.delete('/:id', userController.deleteUser);
module.exports = router;