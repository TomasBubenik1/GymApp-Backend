const express = require("express");
const router = express.Router();
const {
  modifyCalorieIntake,
  getCalorieIntake,
  getCalorieIntakeHistory,
} = require("../controllers/caloriesController");

router.route("/modifycalorieintake").post(modifyCalorieIntake);
router.route("/getcalorieintake").post(getCalorieIntake);
router.route("/getcalorieintakehistory").get(getCalorieIntakeHistory);

module.exports = router;
