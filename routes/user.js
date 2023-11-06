const express = require("express");
const router = express.Router();
const { getAllUsers, getLoggedinUser, Register } = require("../controllers/userController");
router.route("/register").post(Register);
router.route("/getAllUsers").get(getAllUsers);
router.route("/getloggedinuser").get(getLoggedinUser);


module.exports = router;
