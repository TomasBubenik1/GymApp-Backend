const prisma = require("../lib/prisma");
const bcrypt = require("bcrypt");

async function Register(req, res) {
  const {
    email,
    realname,
    nickname,
    username,
    age,
    currentWeight,
    goalWeight,
    height,
    password,
  } = req.body;

  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(password, salt);
  try {
    const user = await prisma.user.create({
      data: {
        email,
        realname,
        nickname,
        username,
        age,
        currentWeight,
        goalWeight,
        height,
        password: hashedPassword,
      },
    });
    return res.status(201).json(user);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Unable to create user" });
  }
}

async function getAllUsers(req, res) {
  try {
    users = await prisma.user.findMany();
    return res.status(200).json({ data: users });
  } catch (error) {
    console.log(erorr);
    return res.status(400).json({ error: "Unable to get Users" });
  }
}

async function getLoggedinUser(req, res) {
  const userko = req.session.user;

  if (!req.session) {
    res.status(400).json({ message: "You arent logged in" });
  } else {
    const userId = userko.id;

    const UserData = await prisma.user.findFirst({
      where: {
        id: userId,
      },
    });

    const exercisePlans = await prisma.workoutPlan.findMany({
      where: {
        createdById: userId,
      },
      include: {
        exercises: { include: { userExerciseData: true } },
        createdBy: true,
        likedWorkoutPlan: true,
      },
    });

    const userExerciseData = await prisma.userExerciseData.findMany({
      where: {
        userId: userId,
      },
    });

    return res.status(200).json({ exercisePlans, userExerciseData, UserData });
  }
}

async function updateUserDetails(req, res) {
  const { currentWeight, goalWeight, height } = req.body;
  const sessionId = req.sessionID;
  if (!sessionId) {
    res.status(400).json({ message: "You arent logged in" });
  } else {
    const sessiondata = await prisma.session.findUnique({
      where: { sid: sessionId },
    });
    const userId = sessiondata.sess.user.id;
    const oldUserData = prisma.user.findMany({
      where: { id: userId },
      include: {
        goalWeight: true,
        currentWeight: true,
        height: true,
      },
    });
    const updatedHistory = prisma.userExerciseDataHistory.create({});
    const newUserData = prisma.user.update({
      where: { id: userId },
      data: {
        height: height,
        currentWeight: currentWeight,
        goalWeight: goalWeight,
      },
    });
  }
}

async function getProfileInfo(req, res) {
  const { username } = req.body;
  const ReqUser = req.session.user;

  if (ReqUser.username != username) {
    try {
      const userProfile = await prisma.user.findFirst({
        where: { username: username },
        select: {
          id: true,
          nickname: true,
          profilepicture: true,
          posts: true,

          workoutPlans: { where: { Visibility: "Public" } },
        },
      });

      if (!userProfile) {
        return res.status(404).json({ error: "User profile not found." });
      }
      const requestSentByLoggedInUser = await prisma.friendRequest.findUnique({
        where: {
          senderId_receiverId: {
            senderId: ReqUser.id,
            receiverId: userProfile.id,
          },
        },
      });

      const requestReceivedFromProfileUser =
        await prisma.friendRequest.findUnique({
          where: {
            senderId_receiverId: {
              senderId: userProfile.id,
              receiverId: ReqUser.id,
            },
          },
        });
      if (requestSentByLoggedInUser) {
        return res.status(200).json({
          userProfile,
          friendRequestStatus: {
            status: requestSentByLoggedInUser.status,
            direction: "outgoing",
          },
        });
      }
      if (requestReceivedFromProfileUser) {
        res.status(200).json({
          userProfile,
          friendRequestStatus: {
            status: requestReceivedFromProfileUser.status,
            direction: "incoming",
          },
        });
      } else {
        return res.status(200).json({
          userProfile,
          friendRequestStatus: {
            status: null,
            direction: null,
          },
        });
      }
    } catch (error) {
      console.error("Error fetching profile info:", error);
      return res.status(500).json({ error: "Internal server error." });
    }
  } else {
    if (ReqUser.username === username) {
      try {
        const userProfile = await prisma.user.findFirst({
          where: { username: username },
          select: {
            id: true,
            nickname: true,
            profilepicture: true,
            posts: true,
            workoutPlans: true,
          },
        });
        return res.status(200).json({ userProfile });
      } catch (error) {
        return res
          .status(500)
          .json({ "There was error fetching profile info:": error });
      }
    }
  }
}

module.exports = {
  Register,
  getAllUsers,
  getLoggedinUser,
  getProfileInfo,
};
