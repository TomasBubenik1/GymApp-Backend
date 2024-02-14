const prisma = require("../lib/prisma");

async function getAllExercises(req, res) {
  try {
    const page = req.body.page ? parseInt(req.body.page) : 1;
    const limit = 30;

    const totalExercises = await prisma.exercise.count();
    const exercises = await prisma.exercise.findMany({
      skip: (page - 1) * limit,
      take: limit,
    });

    res.status(200).json({
      currentPage: page,
      exercisesPerPage: limit,
      totalExercises: totalExercises,
      Exercisesdata: exercises,
    });
  } catch (err) {
    res
      .status(400)
      .json({ error: "There was an error getting exercises", err });
    res.send();
  }
}

async function getFilteredExercises(req, res) {
  const {
    selectedSkillLevel,
    selectedForce,
    selectedMechanic,
    selectedEquipment,
    selectedPrimaryMuscle,
    selectedCategory,
    searchText,
  } = req.body;
  const page = req.body.page ? parseInt(req.body.page) : 1;
  const limit = 30;

  if (selectedPrimaryMuscle.length > 0) {
    const filteredExercises = await prisma.exercise.findMany({
      skip: (page - 1) * limit,
      take: limit,
      where: {
        name: {
          contains: searchText,
          mode: "insensitive",
        },
        level: selectedSkillLevel,
        force: selectedForce,
        mechanic: selectedMechanic,
        category: selectedCategory,
        equipment: selectedEquipment,
        primaryMuscles: {
          hasEvery: [selectedPrimaryMuscle].map((muscle) =>
            muscle.toLowerCase()
          ),
        },
      },
    });
    return res.status(200).json({ filteredExercises, page: page });
  }

  const filteredExercises = await prisma.exercise.findMany({
    skip: (page - 1) * limit,
    take: limit,
    where: {
      name: {
        contains: searchText,
        mode: "insensitive",
      },
      force: selectedForce,
      level: selectedSkillLevel,
      mechanic: selectedMechanic,
      equipment: selectedEquipment,
      category: selectedCategory,
    },
  });
  return res.status(200).json({ filteredExercises, page: page });
}

async function getOneExercise(req, res) {
  const { exerciseId } = req.body;
  data = await prisma.exercise.findFirst({
    where: { id: exerciseId },
  });
  return res.status(200).json({ data });
}

module.exports = {
  getAllExercises,
  getFilteredExercises,
  getOneExercise,
};
