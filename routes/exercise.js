const express = require("express");
const router = express.Router();
const {getAllExercises} = require('../controllers/exerciseController')
router.route("/getallexercises").get(getAllExercises);

module.exports = router