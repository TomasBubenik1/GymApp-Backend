const express = require("express");
const router = express.Router();
const {addExerciseData,updateExerciseData,getUserExerciesData} = require('../controllers/exerciseDataController')
router.route('/addexercisedata').post(addExerciseData)
router.route('/updateexercisedata').post(updateExerciseData)
router.route('/getuserexercisedata').post(getUserExerciesData)

module.exports = router