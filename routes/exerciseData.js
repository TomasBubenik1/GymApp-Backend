const express = require("express");
const router = express.Router();
const {
  addExerciseData,
  updateExerciseData,
  getUserExerciesData,
  getSingleExerciseData,
  getLatestEditedExercise,
} = require("../controllers/exerciseDataController");
router.route("/addexercisedata").post(addExerciseData);
router.route("/updateexercisedata").post(updateExerciseData);
router.route("/getuserexercisedata").post(getUserExerciesData);
router.route("/getsingleexercisedata").post(getSingleExerciseData);
router.route("/getlatesteditedexercise").get(getLatestEditedExercise);

module.exports = router;
