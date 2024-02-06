const fs = require('fs');
const prisma = require('./lib/prisma')
const rawData = fs.readFileSync('exercises.json')
const exercises = JSON.parse(rawData)

console.log(exercises)


async function seedDB(){
    for(exercise of exercises['exercises']){
        await prisma.exercise.create({
        data:{
            name:exercise.name,
            force:exercise.force,
            level:exercise.level,
            mechanic:exercise.mechanic,
            equipment:exercise.equipment,
            primaryMuscles:exercise.primaryMuscles,
            secondaryMuscles:exercise.secondaryMuscles,
            instructions:exercise.instructions,
            category:exercise.category,
            workoutPlans:exercise.workoutPlans
        }
    })
    } 
}
seedDB()