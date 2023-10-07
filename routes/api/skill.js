const express = require('express');
const controllers = require('../../controllers/skillController');
const router = express.Router();


// @route   GET api/skill
// @desc    Test route
// @access  Public

router.route("/details/").get(controllers.getSkillDetails);


module.exports = router;

