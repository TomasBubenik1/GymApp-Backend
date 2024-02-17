const express = require("express");
const router = express.Router();
const {
  getAllUsers,
  getLoggedinUser,
  Register,
  getProfileInfo,
  SearchUsers,
  checkUniqueUsername,
  checkUniqueEmail,
} = require("../controllers/userController");
router.route("/register").post(Register);
router.route("/getAllUsers").get(getAllUsers);
router.route("/getloggedinuser").get(getLoggedinUser);
router.route("/getprofileinfo").post(getProfileInfo);
router.route("/searchusers").post(SearchUsers);
router.route("/checkuniqueusername").post(checkUniqueUsername);
router.route("/checkuniqueemail").post(checkUniqueEmail);

module.exports = router;
