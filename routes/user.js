const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer();

const {
  getAllUsers,
  getLoggedinUser,
  Register,
  getProfileInfo,
  SearchUsers,
  checkUniqueUsername,
  checkUniqueEmail,
  handleBodyMassChange,
  handleUserInfoChange,
} = require("../controllers/userController");
router.route("/register").post(Register);
router.route("/getAllUsers").get(getAllUsers);
router.route("/getloggedinuser").get(getLoggedinUser);
router.route("/getprofileinfo").post(getProfileInfo);
router.route("/searchusers").post(SearchUsers);
router.route("/checkuniqueusername").post(checkUniqueUsername);
router.route("/checkuniqueemail").post(checkUniqueEmail);
router.route("/handlebodymasschange").post(handleBodyMassChange);
router
  .route("/handleuserinfochange")
  .post(upload.single("file"), handleUserInfoChange);

module.exports = router;
