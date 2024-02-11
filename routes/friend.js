const express = require("express");
const router = express.Router();

const {
  sendFriendRequest,
  AcceptFriendRequest,
  GetFriendRequestStatus,
} = require("../controllers/friendContoller");

router.route("/sendfriendrequest").post(sendFriendRequest);
router.route("/acceptfriendrequest").post(AcceptFriendRequest);
router.route("/getfriendrequeststatus").post(GetFriendRequestStatus);

module.exports = router;  
