const express = require("express");
const router = express.Router();

const {
  sendFriendRequest,
  AcceptFriendRequest,
  GetFriendRequestStatus,
  removeFriend,
} = require("../controllers/friendContoller");

router.route("/sendfriendrequest").post(sendFriendRequest);
router.route("/acceptfriendrequest").post(AcceptFriendRequest);
router.route("/getfriendrequeststatus").post(GetFriendRequestStatus);
router.route("/removefriend").post(removeFriend);

module.exports = router;
