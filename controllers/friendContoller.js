const prisma = require("../lib/prisma");
const { createFriendRequestNotification } = require("./notificationController");

async function sendFriendRequest(req, res) {
  const { receiverId } = req.body;
  const senderId = req.session?.user?.id;

  if (!senderId) {
    return res.status(400).json({ message: "You aren't logged in!" });
  }
  try {
    const existingRequest = await prisma.friendRequest.findUnique({
      where: {
        senderId_receiverId: {
          senderId,
          receiverId,
        },
      },
    });

    if (existingRequest) {
      await prisma.friendRequest.delete({
        where: {
          senderId_receiverId: {
            senderId,
            receiverId,
          },
        },
      });
      return res.status(200).json({ status: null });
    } else {
      const request = await prisma.friendRequest.create({
        data: {
          senderId,
          receiverId,
          status: "pending",
        },
      });
      await createFriendRequestNotification(senderId, receiverId);
      return res.status(200).json({ status: "pending" });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

async function AcceptFriendRequest(req, res) {
  const userId = req.session.user.id;
  const { senderId } = req.body;
  try {
    const deletedNotifications = await prisma.notification.deleteMany({
      where: {
        type: "friendRequest",
        senderId: senderId,
        userId: userId,
      },
    });

    const incommingfriendRequest = await prisma.friendRequest.update({
      where: {
        senderId_receiverId: {
          senderId: senderId,
          receiverId: userId,
        },
      },
      data: {
        status: "accepted",
      },
    });

    res.status(200).json(incommingfriendRequest);
  } catch (error) {
    res.status(400).json({ error: "Could not accept friend request." });
  }
}

async function GetFriendRequestStatus(req, res) {
  const { profileId } = req.body;
  const userId = req.session.user.id;

  try {
    const requestSentByLoggedInUser = await prisma.friendRequest.findUnique({
      where: {
        senderId_receiverId: {
          senderId: userId,
          receiverId: profileId,
        },
      },
    });

    const requestReceivedFromProfileUser =
      await prisma.friendRequest.findUnique({
        where: {
          senderId_receiverId: {
            senderId: profileId,
            receiverId: userId,
          },
        },
      });

    if (requestSentByLoggedInUser) {
      return res.json({
        status: requestSentByLoggedInUser.status,
        direction: "outgoing",
      });
    } else if (requestReceivedFromProfileUser) {
      return res.json({
        status: requestReceivedFromProfileUser.status,
        direction: "incoming",
      });
    } else {
      return res.json({ status: null, direction: null });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

async function removeFriend(req, res) {
  const { friendId } = req.body;
  const userId = req.session.user.id;

  try {
    const deleteSenderRequest = prisma.friendRequest.deleteMany({
      where: {
        senderId: userId,
        receiverId: friendId,
        status: "accepted",
      },
    });

    const deleteReceiverRequest = prisma.friendRequest.deleteMany({
      where: {
        senderId: friendId,
        receiverId: userId,
        status: "accepted",
      },
    });
    await prisma.$transaction([deleteSenderRequest, deleteReceiverRequest]);

    res.status(200).json({ message: "Friend removed successfully." });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Could not remove friend.", details: error.message });
  }
}

module.exports = {
  removeFriend,
  sendFriendRequest,
  AcceptFriendRequest,
  GetFriendRequestStatus,
};
