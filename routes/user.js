const express = require("express");
const router = express.Router();
const { createUser, getAllUsers, getLoggedinUser } = require("../controllers/userController");
const {Login,Logout} = require('../controllers/authConttroller')

router.route("/createUser").post(createUser);
router.route("/getAllUsers").get(getAllUsers);
router.route('/auth/login').post(Login);
router.route('/auth/logout').post(Logout);
router.route("/getloggedinuser").get(getLoggedinUser);

module.exports = router;
