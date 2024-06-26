const express = require("express");
const multer = require("multer");
const upload = multer();
const router = express.Router();
const {
  createPost,
  postComment,
  toggleLike,
  getAllPosts,
  getSinglePost,
  deletePost,
} = require("../controllers/postController");

router.route("/createpost").post(upload.single("file"), createPost);
router.route("/postcomment").post(postComment);
router.route("/togglelike").post(toggleLike);
router.route("/getallposts").get(getAllPosts);
router.route("/getsinglepost").post(getSinglePost);
router.route("/deletepost").post(deletePost);

module.exports = router;
