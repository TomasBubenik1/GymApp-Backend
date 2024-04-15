const prisma = require("../lib/prisma");
const imagekit = require("../lib/imagekit");
const bcrypt = require("bcrypt");
const crypto = require("crypto");

async function Register(req, res) {
  const {
    email,
    username,
    nickname,
    age,
    currentWeight,
    goalWeight,
    height,
    password,
  } = req.body;

  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(password, salt);

  const emailTaken = await prisma.user.findFirst({
    where: {
      email: email,
    },
  });
  const resultEmail = Boolean(emailTaken);
  if (resultEmail == true) {
    return res
      .status(400)
      .json({ message: "This username is already being uesd." });
  }

  const usernameTaken = await prisma.user.findFirst({
    where: {
      username: username,
    },
  });

  const resultUsername = Boolean(usernameTaken);
  if (resultUsername == true) {
    return res
      .status(400)
      .json({ message: "This username is already being uesd." });
  }

  console.log(req.body);
  try {
    const user = await prisma.user.create({
      data: {
        email: email,
        nickname: nickname,
        username: username,
        age: age,
        currentWeight: parseFloat(currentWeight),
        goalWeight: parseFloat(goalWeight),
        height: height,
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
      include: {
        likedPosts: true,
        receivedNotifications: {
          orderBy: {
            createdAt: "desc",
          },
          include: {
            sender: {
              select: {
                username: true,
                nickname: true,
                profilepicture: true,
              },
            },
          },
        },
        workoutPlans: true,
        userExerciseData: true,
        weightHistory: true,
        userGoalWeightHistory: true,
        heightHistory: true,
      },
    });

    return res.status(200).json({ UserData });
  }
}

async function handleBodyMassChange(req, res) {
  const { newGoalWeight, newCurrentWeight, newHeight } = req.body;
  const userId = req.session?.user.id;

  if (!req.session) {
    res.status(400).json({ message: "You arent logged in" });
  } else {
    const oldBodyMass = await prisma.user.findFirst({
      where: {
        id: userId,
      },
      select: {
        currentWeight: true,
        goalWeight: true,
        height: true,
      },
    });

    const changedBodyMass = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        currentWeight: parseFloat(newCurrentWeight),
        goalWeight: parseFloat(newGoalWeight),
        height: parseFloat(newHeight),
      },
    });

    if (newCurrentWeight != oldBodyMass.currentWeight) {
      const WeightHistoryEntry = await prisma.userWeightHistory.create({
        data: {
          userId: userId,
          weight: oldBodyMass.currentWeight,
        },
      });
    }
    if (newHeight != oldBodyMass.height) {
      const HeightHistoryEntry = await prisma.userHeightHistory.create({
        data: {
          userId: userId,
          height: oldBodyMass.height,
        },
      });
    }
    if (newGoalWeight != oldBodyMass.goalWeight) {
      const GoalWeightHistoryEntry = await prisma.userGoalWeightHistory.create({
        data: {
          userId: userId,
          goalWeight: oldBodyMass.goalWeight,
        },
      });
    }

    return res
      .status(200)
      .json({ message: "Sucesfully updated body mass information" });
  }
}
async function handleUserInfoChange(req, res) {
  const { username, nickname, realname, bio } = req.body;

  const userId = req.session?.user.id;
  console.log(req.body);
  if (!req.session) {
    res.status(400).json({ message: "You arent logged in" });
  } else {
    if (req.file) {
      try {
        const randomImageName = crypto.randomBytes(32).toString("hex");

        const uploadResponse = await imagekit.upload({
          file: req.file.buffer.toString("base64"),
          fileName: randomImageName,
          folder: "UserProfilePictures",
        });
        console.log("file name:", uploadResponse.name);
        const changedInfo = await prisma.user.update({
          where: {
            id: userId,
          },
          data: {
            username: username,
            nickname: nickname,
            realname: realname,
            bio: bio,
            profilepicture: `https://ik.imagekit.io/bubenik/UserProfilePictures/${uploadResponse.name}`,
          },
        });
        console.log("Chantute info:", changedInfo);
        return res
          .status(200)
          .json({ message: "Sucesfully changed user info!", changedInfo });
      } catch (error) {
        return res.status(500).json({
          message: "There was updating profile info with profile picture!",
        });
      }
    }
  }
}

async function checkUniqueUsername(req, res) {
  const { username } = req.body;
  if (!username) {
    return res
      .status(400)
      .json({ message: "You must provide username you want to check." });
  } else if (username) {
    const isTaken = await prisma.user.findFirst({
      where: {
        username: username,
      },
    });
    const result = Boolean(isTaken);
    return res.status(200).json({
      result: Boolean(isTaken),
    });
  }
}
async function checkUniqueEmail(req, res) {
  const { email } = req.body;
  if (!email) {
    return res
      .status(400)
      .json({ message: "You must provide username you want to check." });
  } else if (email) {
    const isTaken = await prisma.user.findFirst({
      where: {
        email: email,
      },
    });
    const result = Boolean(isTaken);
    return res.status(200).json({
      result: Boolean(isTaken),
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

          workoutPlans: { where: { isPublic: true } },
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
            posts: {
              orderBy: {
                createdAt: "desc",
              },
            },
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

async function SearchUsers(req, res) {
  const { searchText } = req.body;
  const ReqUser = req.session.user;

  if (!ReqUser) {
    return res.status(400).json({
      message: "You aren't logged in.",
    });
  }

  try {
    const foundUsers = await prisma.user.findMany({
      where: {
        username: {
          contains: searchText,
          mode: "insensitive",
        },
      },
      select: {
        username: true,
        nickname: true,
        profilepicture: true, // Ensure this field name matches your schema definition
      },
    });

    res.status(200).json({ foundUsers });
  } catch (error) {
    // Handle errors from the database operation
    console.error("Failed to search for users:", error);
    res.status(500).json({
      message: "Internal server error while searching for users.",
    });
  }
}

module.exports = {
  Register,
  getAllUsers,
  getLoggedinUser,
  getProfileInfo,
  SearchUsers,
  checkUniqueEmail,
  checkUniqueUsername,
  handleBodyMassChange,
  handleUserInfoChange,
};
