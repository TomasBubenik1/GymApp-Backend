const express = require("express");
const router = express.Router();
const {getAllExercises,getFilteredExercises} = require('../controllers/exerciseController')
router.route("/getallexercises").get(getAllExercises);
router.route("/getfilteredexercises").post(getFilteredExercises)

module.exports = router