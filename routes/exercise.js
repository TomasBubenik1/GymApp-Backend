const express = require("express");
const router = express.Router();
const {
  getAllExercises,
  getFilteredExercises,
  getOneExercise,
} = require("../controllers/exerciseController");
router.route("/getallexercises").get(getAllExercises);
router.route("/getfilteredexercises").post(getFilteredExercises);
router.route("/getoneexercise").post(getOneExercise);

module.exports = router;
