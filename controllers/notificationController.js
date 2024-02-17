const prisma = require("../lib/prisma");

async function frinedNotification() {
  const userId = req.session.user?.id;
  if (!userId) {
    return es.status(400).json({
      message: "You aren't logged in",
    });
  } else {
    try {
      const incommingFriendRequests = await prisma.friendRequest.findMany({
        where: {
          receiverId: userId,
        },
        include: {
          sender: {
            select: {
              username,
              profilepicture,
              nickname,
            },
          },
        },
      });
      res.status(200).json(incommingFriendRequests);
    } catch (error) {
      return res.status(500).json({
        message: "Internal server error when trying to get notificatinos:",
        error,
      });
    }
  }
}

module.exports = {
  frinedNotification,
};
