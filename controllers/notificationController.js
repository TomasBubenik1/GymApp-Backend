const prisma = require("../lib/prisma");

async function createLikeNotification(userId, postId, senderId) {
  try {
    const notification = await prisma.notification.create({
      data: {
        userId,
        senderId,
        type: "like",
        referenceId: postId,
        message: "has liked your post.",
        read: false,
      },
    });
    return notification;
  } catch (error) {
    console.error("Error creating like notification", error);
    throw error;
  }
}

async function createFriendRequestNotification(senderId, receiverId) {
  try {
    const notification = await prisma.notification.create({
      data: {
        userId: receiverId,
        senderId: senderId,
        type: "friendRequest",
        referenceId: senderId,
        message: "sent you friend request.",
        read: false,
      },
    });
    return notification;
  } catch (error) {
    console.error("Error creating friend request notification", error);
    throw error;
  }
}

async function viewIncomingNotifications(req, res) {
  const userId = req.session?.user?.id;

  if (!userId) {
    return res.status(401).json({
      message: "Unauthorized access. Please log in.",
    });
  }

  try {
    await prisma.notification.updateMany({
      where: {
        userId: userId,
      },
      data: {
        read: true,
      },
    });

    return res.status(200).json("Sucesfully cleared notifications!");
  } catch (error) {
    console.error("Error fetching notifications", error);
    return res.status(500).json({
      message: "Internal server error when trying to get notifications.",
      error: error.message,
    });
  }
}

module.exports = {
  createLikeNotification,
  viewIncomingNotifications,
  createFriendRequestNotification,
};
