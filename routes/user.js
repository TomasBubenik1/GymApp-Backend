const express = require("express");
const router = express.Router();
const {
  getAllUsers,
  getLoggedinUser,
  Register,
  getProfileInfo,
} = require("../controllers/userController");
router.route("/register").post(Register);
router.route("/getAllUsers").get(getAllUsers);
router.route("/getloggedinuser").get(getLoggedinUser);
router.route("/getprofileinfo").post(getProfileInfo);

module.exports = router;
