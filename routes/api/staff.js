const express = require('express');
const controllers = require('../../controllers/staffController');
const router = express.Router();


// @route   GET api/staff
// @desc    Test route
// @access  Public

router.route("/details/").get(controllers.getStaffDetails);
router.route("/details/:id").get(controllers.getStaffDetail);
router.route("/skills/:id").get(controllers.getStaffSkills);
router.route("/role/:id").get(controllers.getStaffRoles);
router.route("/application/:id").get(controllers.getStaffApplications);

// @route   POST api/staff/application/create
// @desc    Test route
// @access  Public

router.route("/application/create").post(controllers.createApplication);









module.exports = router;