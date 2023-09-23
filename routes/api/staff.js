const express = require('express');
const controllers = require('../../controllers/staffController');
const router = express.Router();


// @route   GET api/roles
// @desc    Test route
// @access  Public
// GET methods
router.route("/details/").get(controllers.getStaffDetails);
router.route("/details/:id").get(controllers.getStaffDetail);
router.route("/skills/:id").get(controllers.getStaffSkills);
router.route("/role/:id").get(controllers.getStaffRoles);
router.route("/application/:id").get(controllers.getStaffApplications);









module.exports = router;