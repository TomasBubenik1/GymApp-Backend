const prisma = require("../lib/prisma");

async function sendFriendRequest(req, res) {
  const { receiverId } = req.body;
  const senderUser = req.session.user;

  const senderId = senderUser.id;

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

module.exports = {
  sendFriendRequest,
  AcceptFriendRequest,
  GetFriendRequestStatus,
};
