const express = require('express');
const controllers = require('../../controllers/staffController');
const router = express.Router();


// @route   GET api/staff
// @desc    Test route
// @access  Public

router.route("/details/").get(controllers.getStaffDetails);
router.route("/details/:id").get(controllers.getStaffDetail);
router.route("/skills").get(controllers.getStaffSkills);
router.route("/skills/:id").get(controllers.getStaffSkill);
router.route("/role/:id").get(controllers.getStaffRoles);
router.route("/application/:id").get(controllers.getStaffApplications);

// @route   POST api/staff/application/
// @desc    Test route
// @access  Public

router.route("/application/").post(controllers.createApplication);

// @route   PUT api/staff/application/:id
// @desc    Test route
// @access  Public

router.route("/application/:rl_id/:staff_id").put(controllers.updateApplicationStatus);


module.exports = router;