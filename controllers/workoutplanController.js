const prisma = require("../lib/prisma");

async function createWorkoutPlan(req, res) {
  const { title, description } = req.body;
  const userId = req.session?.user?.id;

  if (!title || !userId) {
    res.status(400).json({ error: "Title and userId are required" });
  }
  try {
    const workoutPlan = await prisma.workoutPlan.create({
      data: {
        title,
        description,
        createdById: userId,
      },
    });
    res.status(201).json(workoutPlan);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Unable to create WorkoutPlan" });
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
    const workoutPlan = await prisma.workoutPlan.findFirst({
      where: {
        AND: [
          { id: workoutPlanId },
          {
            OR: [{ createdById: userId }, { isPublic: true }],
          },
        ],
      },
      include: {
        exercises: {
          include: {
            userExerciseData: {
              where: {
                userId: userId,
              },
            },
            userExerciseDataHistory: {
              where: {
                userId: userId,
              },
            },
          },
        },
      },
    });

    if (!workoutPlan) {
      return res
        .status(404)
        .json({ error: "Workout plan not found or access denied." });
    }

    return res.json(workoutPlan);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: "An error occurred while retrieving the workout plan." });
  }
}

module.exports = {
  createWorkoutPlan,
  addExerciseIntoPlan,
  getOneWorkoutPlan,
  removeExerciseFromPlan,
};
