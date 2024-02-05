const express = require("express");
const router = express.Router();
const {createPost,postComment,toggleLike} = require('../controllers/postController')
router.route('/createpost').post(createPost)
router.route('/postcomment').post(postComment)
router.route('/togglelike').post(toggleLike)


module.exports = router