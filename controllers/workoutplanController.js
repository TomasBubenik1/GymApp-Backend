const prisma = require("../lib/prisma");

async function createWorkoutPlan(req, res) {
  const { title, description } = req.body;
  const userId = req.session.user?.id;

  if (!title || !userId) {
    return res.status(400).json({ error: "Title and userId are required" });
  }
  try {
    const workoutPlan = await prisma.workoutPlan.create({
      data: {
        title,
        description,
        createdById: userId,
      },
    });
    return res.status(201).json(workoutPlan);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Unable to create WorkoutPlan" });
  }
}

async function addExerciseIntoPlan(req, res) {
  {
    const { workoutPlanId, exerciseId } = req.body;
    const userId = req.session?.user?.id;

    if (!userId) {
      return res.status(400).json({ error: "You arent logged in:" });
    }
    const workoutPlan = await prisma.workoutPlan.findUnique({
      where: {
        id: workoutPlanId,
      },
    });
    if (!workoutPlan) {
      return res.status(404).json({ error: "Workout plan not found." });
    }

    if (userId != workoutPlan.createdById) {
      return res
        .status(401)
        .json({ message: "You arent the owner of this workout plan" });
    }

    const exercise = await prisma.exercise.findUnique({
      where: {
        id: exerciseId,
      },
    });

    if (!exercise) {
      return res.status(404).json({ error: "Exercise not found." });
    }

    const updatedWorkoutPlan = await prisma.workoutPlan.update({
      where: {
        id: workoutPlanId,
      },
      data: {
        exercises: {
          connect: {
            id: exerciseId,
          },
        },
      },
    });

    return res.status(200).json({
      message: `Successfully added ${exercise.name} into ${workoutPlan.title}!`,
    });
  }
}
async function removeExerciseFromPlan(req, res) {
  const { workoutPlanId, exerciseId } = req.body;
  const userId = req.session?.user?.id;

  if (!userId) {
    return res.status(400).json({ error: "You aren't logged in." });
  }

  const workoutPlan = await prisma.workoutPlan.findUnique({
    where: {
      id: workoutPlanId,
    },
  });

  if (!workoutPlan) {
    return res.status(404).json({ error: "Workout plan not found." });
  }

  if (userId != workoutPlan.createdById) {
    return res
      .status(401)
      .json({ message: "You aren't the owner of this workout plan." });
  }

  const exercise = await prisma.exercise.findUnique({
    where: {
      id: exerciseId,
    },
  });

  if (!exercise) {
    return res.status(404).json({ error: "Exercise not found." });
  }

  const updatedWorkoutPlan = await prisma.workoutPlan.update({
    where: {
      id: workoutPlanId,
    },
    data: {
      exercises: {
        disconnect: {
          id: exerciseId,
        },
      },
    },
  });

  return res.status(200).json({
    message: `Successfully removed ${exercise.name} from ${workoutPlan.title}!`,
  });
}

async function getOneWorkoutPlan(req, res) {
  const { workoutPlanId } = req.body;
  const userId = req.session?.user?.id;

  if (!userId) {
    return res.status(400).json({ error: "You aren't logged in." });
  }

  if (!workoutPlanId) {
    return res.status(400).json({
      error: "You need to provide the workoutPlanId you want to get.",
    });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        sentRequests: {
          where: { status: "accepted" },
          select: { receiverId: true },
        },
        receivedRequests: {
          where: { status: "accepted" },
          select: { senderId: true },
        },
      },
    });

    const workoutPlan = await prisma.workoutPlan.findFirst({
      where: { id: workoutPlanId },
      include: {
        exercises: {
          include: {
            userExerciseData: { where: { userId: userId } },
            userExerciseDataHistory: { where: { userId: userId } },
          },
        },
      },
    });

    if (!workoutPlan) {
      return res
        .status(400)
        .json({ error: "No workout plan found with this id." });
    }

    if (userId === workoutPlan.createdById) {
      return res.status(200).json(workoutPlan);
    }
    if (
      workoutPlan.visibility === "Private" &&
      workoutPlan.createdById !== userId
    ) {
      return res
        .status(403)
        .json({ error: "You don't have access to view this workout plan." });
    }

    const friendIds = [
      ...user.sentRequests.map((request) => request.receiverId),
      ...user.receivedRequests.map((request) => request.senderId),
    ];

    if (
      workoutPlan.visibility === "Friends" &&
      !friendIds.includes(workoutPlan.createdById)
    ) {
      return res
        .status(403)
        .json({ error: "You don't have access to view this workout plan." });
    }
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: "An error occurred while retrieving the workout plan." });
  }
}

async function changeWorkoutPlanVisibility(req, res) {
  const { workoutPlanId, newVisibility } = req.body;
  const userId = req.session?.user?.id;
  if (!userId) {
    return res.status(400).json({ message: "You arent logged in!" });
  }
  const isOwner = await prisma.workoutPlan.findFirst({
    where: {
      createdById: userId,
      id: workoutPlanId,
    },
  });
  if (!isOwner) {
    return res
      .status(403)
      .json({ message: "You cant edit workout plan you don't own!" });
  }
  if (isOwner) {
    const editedWorkoutPlat = await prisma.workoutPlan.update({
      where: {
        createdById: userId,
        id: workoutPlanId,
      },
      data: {
        visibility: newVisibility,
      },
    });
  }
}

async function deleteWorkoutPlan(req, res) {
  const { workoutPlanId } = req.body;
  const userId = req.session?.user?.id;
  if (!userId) {
    return res.status(403).json({ message: "You arent logged in!" });
  }
  const isOwner = await prisma.workoutPlan.findFirst({
    where: {
      createdById: userId,
      id: workoutPlanId,
    },
  });
  if (!isOwner) {
    return res
      .status(400)
      .json({ message: "You cant delete workout plan you dont own." });
  }
  if (!workoutPlanId) {
    return res.status(400).json({
      message: "You must provide the workoutplan id you want to delete!",
    });
  }
  try {
    const res = await prisma.workoutPlan.delete({
      where: {
        createdById: userId,
        id: workoutPlanId,
      },
    });
    return res
      .status(200)
      .json({ message: "Sucesfully deleted workout plan", res });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "There was error deleting workoutplan:", error });
  }
}

module.exports = {
  createWorkoutPlan,
  addExerciseIntoPlan,
  getOneWorkoutPlan,
  deleteWorkoutPlan,
  removeExerciseFromPlan,
  changeWorkoutPlanVisibility,
};
