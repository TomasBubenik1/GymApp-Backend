const prisma = require("../lib/prisma");

async function getAllExercises(req, res) {
  try {
    const page = req.query.page ? parseInt(req.query.page) : 1;
    const limit = req.query.limit ? parseInt(req.query.limit) : 30;

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
    res.status(400).json({ error: "There was an error getting exercises", err });
    res.send()
  }
}

async function getFilteredExercises(req,res){
  
  const {selectedSkillLevel,selectedForce,selectedMechanic,selectedEquipment,selectedPrimaryMuscle,selectedCategory} = req.body
  if(selectedPrimaryMuscle.length > 0){
    const filteredExercises =  await prisma.exercise.findMany({

      where: {
        level:selectedSkillLevel,
        force:selectedForce,
        mechanic:selectedMechanic,
        category:selectedCategory,
        equipment:selectedEquipment,
        primaryMuscles: { hasEvery: [selectedPrimaryMuscle].map(muscle => muscle.toLowerCase())} 
      }
    }
    )
    res.status(200).json({filteredExercises})
    return res.send()
}


 
  const filteredExercises =  await prisma.exercise.findMany({
    
    where: {
      force:selectedForce,
      level:selectedSkillLevel,
      mechanic:selectedMechanic,
      equipment:selectedEquipment,
      category:selectedCategory,
    }
    
  })
  res.status(200).json({filteredExercises})
  return res.send()
}

async function getOneExercise(req,res){
  const { exerciseId } = req.body
  data = await prisma.exercise.findFirst({
    where:{id:exerciseId}
  })
return res.status(200).json({data})
}



module.exports = {
  getAllExercises,
  getFilteredExercises,
  getOneExercise
};
