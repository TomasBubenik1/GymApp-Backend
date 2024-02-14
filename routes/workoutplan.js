const express = require("express");
const router = express.Router();
const {
  createWorkoutPlan,
  addExerciseIntoPlan,
  getOneWorkoutPlan,
  removeExerciseFromPlan,
} = require("../controllers/workoutplanController");
router.route("/createworkoutplan").post(createWorkoutPlan);
router.route("/addexerciseintoplan").post(addExerciseIntoPlan);
router.route("/getoneworkoutplan").post(getOneWorkoutPlan);
router.route("/removeexercisefromplan").post(removeExerciseFromPlan);

module.exports = router;
