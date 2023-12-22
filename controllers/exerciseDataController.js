    const prisma = require("../lib/prisma");



    async function getUserExerciesData(req,res){
        const {userId,exerciseId} = req.body

        const userExerciseData = await prisma.userExerciseData.findUnique({
            where: { userId_exerciseId: { userId, exerciseId } },
        })
        return res.status(200).json({userExerciseData})
    }   

    async function addExerciseData(req,res){
        const {userId,exerciseId,weight,reps,sets} = req.body

        const newExerciseData = await prisma.userExerciseData.create({
            data:{
                userId:userId,
                exerciseId:exerciseId,
                weight:weight,
                reps:reps,
                sets:sets,
                userDataHistory:{}
            }

        })
        return res.status(200).json({newExerciseData})
    }

    async function updateExerciseData(req,res){

        

        const {userId,exerciseId,newWeight,newReps,newSets} = req.body

        const existingExerciseData = await prisma.userExerciseData.findUnique({
            where: { userId_exerciseId: { userId, exerciseId } },
        
        })

        const updatedPreviousHistory =  [existingExerciseData.previousHistory,{weight:existingExerciseData.weight,reps:existingExerciseData.reps,sets:existingExerciseData.sets,createdAt:existingExerciseData.createdAt}]
        
        

        const updatedExerciseData = await prisma.userExerciseData.update({
            where: { userId_exerciseId: { userId, exerciseId } },
            data:{
                weight:newWeight,
                reps:newReps,
                sets:newSets,
                previousHistory:updatedPreviousHistory
            }
        })
        res.status(200).json({updatedExerciseData})

    }

    module.exports={
        addExerciseData,
        updateExerciseData,
        getUserExerciesData
    }