const express = require("express");
const router = express.Router();

const {
  viewIncomingNotifications,
} = require("../controllers/notificationController");

router.route("/viewincomingnotifications").post(viewIncomingNotifications);

module.exports = router;
