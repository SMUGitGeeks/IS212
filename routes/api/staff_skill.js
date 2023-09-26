const express = require('express');
const controllers = require('../../controllers/rolesController');
const router = express.Router();


// @route   GET api/staff_skill
// @desc    Test route
// @access  Public
router.route("/details").get(controllers.getStaffSkills);
router.route("/detail/:id").get(controllers.getStaffSkill);
router.route("/staff").get(controllers.getStaffDetails);
router.route("/staff/:id").get(controllers.getStaffDetail);
router.route("/skills").get(controllers.getSkillDetails);
router.route("/skill/:id").get(controllers.getSkillDetail);

module.exports = router;