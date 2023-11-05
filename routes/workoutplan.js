const express = require("express");
const router = express.Router();
const {createWorkoutPlan,addExerciseIntoPlan,getExercisePlansCreatedByUser} = require('../controllers/workoutplanController')
router.route('/createworkoutplan').post(createWorkoutPlan)
router.route('/addexerciseintoplan').post(addExerciseIntoPlan)

module.exports = router;
