const express = require('express');
const controllers = require('../../controllers/rolesController');
const router = express.Router();


// @route   GET api/skill
// @desc    Test route
// @access  Public
router.route("/details").get(controllers.getSkillDetails);
router.route("/detail/:id").get(controllers.getSkillDetail);

module.exports = router;