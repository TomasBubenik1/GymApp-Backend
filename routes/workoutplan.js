const express = require("express");
const router = express.Router();
const {
  createWorkoutPlan,
  addExerciseIntoPlan,
} = require("../controllers/workoutplanController");
router.route("/createworkoutplan").post(createWorkoutPlan);
router.route("/addexerciseintoplan").post(addExerciseIntoPlan);

module.exports = router;
