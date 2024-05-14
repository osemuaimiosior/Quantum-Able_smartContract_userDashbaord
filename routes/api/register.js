const express = require('express');
const router = express.Router();
const registerController = require('../../controllers/registerController');

router.route('/signUp')
    .post(registerController.regNewUser);

router.route('/logIn')
    .post(registerController.logInUser);

module.exports = router;