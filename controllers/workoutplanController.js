const prisma = require("../lib/prisma");

async function createWorkoutPlan(req,res){
  
  const { title, description, userId } = req.body;

    if(!title || !userId){
      res.status(400).json({error:'Title and userId are required'})
  }
  try{
     const workoutPlan = await prisma.workoutPlan.create({
      data:{
          title,
          description,
          createdById:userId
      }
     })
     res.status(201).json(workoutPlan)
  }catch(error){
      console.error(error);
      res.status(500).json({ error: "Unable to create WorkoutPlan" });
  }
    
    
}   

async function addExerciseIntoPlan(req,res){{
    const { workoutPlanId, exerciseId } = req.body;
    const {id:userId} = req.session.user;

    const workoutPlan = await prisma.workoutPlan.findUnique({
        where: {
          id: workoutPlanId,
        },
      });

    if (!workoutPlan) {
        return res.status(404).json({ error: 'Workout plan not found.' });
      }
  
    if(userId !=workoutPlan.createdById){
        return res.status(401).json({error:'You arent creator of this WorkoutPlan'})
    }

    const exercise = await prisma.exercise.findUnique({
        where: {
          id: exerciseId,
        },
      });
  
      if (!exercise) {
        return res.status(404).json({ error: 'Exercise not found.' });
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

      return res.status(200).json(updatedWorkoutPlan);
      
}}





module.exports = { createWorkoutPlan,addExerciseIntoPlan };
