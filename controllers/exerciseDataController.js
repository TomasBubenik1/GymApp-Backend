const prisma = require("../lib/prisma");

async function getUserExerciesData(req, res) {
  const { exerciseId } = req.body;
  const sessionId = req.sessionID;

  if (!sessionId) {
    res.status(400).json({ message: "You arent logged in" });
  } else {
    const sessiondata = await prisma.session.findUnique({
      where: { sid: sessionId },
    });
    const userId = sessiondata.sess.user.id;
    const userExerciseData = await prisma.userExerciseData.findUnique({
      where: { userId_exerciseId: { userId, exerciseId } },
    });
    return res.status(200).json({ userExerciseData });
  }
}

async function addExerciseData(req, res) {
  const { exerciseId, weight, reps, sets } = req.body;
  const sessionId = req.sessionID;

  if (!sessionId) {
    res.status(400).json({ message: "You arent logged in" });
  } else {
    const sessiondata = await prisma.session.findUnique({
      where: { sid: sessionId },
    });
    const userId = sessiondata.sess.user.id;

    const newExerciseData = await prisma.userExerciseData.create({
      data: {
        userId: userId,
        exerciseId: exerciseId,
        weight: weight,
        reps: reps,
        sets: sets,
        userDataHistory: {},
      },
    });
    return res.status(200).json({ newExerciseData });
  }
}



async function getSingleExerciseData(req, res) {
  const { exerciseId } = req.body;
  const sessionId = req.sessionID;
  if (!sessionId) {
    res.status(400).json({ message: "You arent logged in" });
  } else {
    const sessiondata = await prisma.session.findUnique({
      where: { sid: sessionId },
    });
    const userId = sessiondata.sess.user.id;
    const currentExerciseData = await prisma.userExerciseData.findUnique({
      where: { userId_exerciseId: { userId, exerciseId } },
    });
    const historyExerciseData = await prisma.userExerciseDataHistory.findMany({
      where: { userId: userId, exerciseId: exerciseId },
      orderBy: { createdAt: "asc" },
    });
    res.status(200).json({ currentExerciseData, historyExerciseData });
  }
}

async function updateExerciseData(req, res) {
  const { exerciseId, newWeight, newReps, newSets } = req.body;
  const sessionId = req.sessionID;
  if (!sessionId) {
    res.status(400).json({ message: "You arent logged in" });
  } else {
    const sessiondata = await prisma.session.findUnique({
      where: { sid: sessionId },
    });
    const userId = sessiondata.sess.user.id;
    const existingExerciseData = await prisma.userExerciseData.findUnique({
      where: { userId_exerciseId: { userId, exerciseId } },
    });

    const updatedExerciseDataHistory =
      await prisma.userExerciseDataHistory.create({
        data: {
          userId: userId,
          exerciseId: exerciseId,
          weight: existingExerciseData.weight,
          reps: existingExerciseData.reps,
          sets: existingExerciseData.sets,
        },
      });

    const updatedExerciseData = await prisma.userExerciseData.update({
      where: { userId_exerciseId: { userId, exerciseId } },
      data: {
        weight: newWeight,
        reps: newReps,
        sets: newSets,
      },
    });
    res.status(200).json({ updatedExerciseData });
  }
}

async function getLatestEditedExercise(req, res) {
  const sessionId = req.sessionID;
  if (!sessionId) {
    res.status(400).json({ message: "You arent logged in" });
  } else {
    const sessiondata = await prisma.session.findUnique({
      where: { sid: sessionId },
    });
    const userId = sessiondata.sess.user.id;
    try{
    const latestExerciseId = await prisma.userExerciseDataHistory.findFirst({
      where:{userId:userId},
      orderBy:{createdAt:'desc'},
      select: {
        exerciseId: true,
        exercise: { select: { name: true } },
      },
    })
    res.status(200).json({latestExerciseId})
  }catch(error){
    res.status(400).json({message:"There was error getting the latest exercise",error})
  }
  }
}

module.exports = {
  addExerciseData,
  updateExerciseData,
  getUserExerciesData,
  getSingleExerciseData,
  getLatestEditedExercise
};
