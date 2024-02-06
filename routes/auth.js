const express = require("express");
const router = express.Router();
const {Login,Logout} = require('../controllers/authConttroller')

router.route('/auth/login').post(Login);
router.route('/auth/logout').post(Logout);

module.exports = router