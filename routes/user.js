const express = require("express");
const router = express.Router();
const { createUser, getAllUsers } = require("../controllers/userController");

router.route("/createUser").post(createUser);
router.route("/getAllUsers").get(getAllUsers);
module.exports = router;
