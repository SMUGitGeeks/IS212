const express = require('express');
const controllers = require('../../controllers/rolesController');
const router = express.Router();


// @route   GET api/roles
// @desc    Test route
// @access  Public
router.route("/details").get(controllers.getRoleDetails);
router.route("/detail/:id").get(controllers.getRoleDetail);
router.route("/skills").get(controllers.getRoleSkills);
router.route("/skill/:id").get(controllers.getRoleSkill);

module.exports = router;