const express = require('express');
const controllers = require('../../controllers/skillController');
const router = express.Router();


// @route   GET api/roles
// @desc    Test route
// @access  Public
// GET methods
router.route("/details/").get(controllers.getSkillDetails);









module.exports = router;

