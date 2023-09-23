const express = require('express');
const controllers = require('../../controllers/roleController');
const router = express.Router();


// @route   GET api/role
// @desc    Test route
// @access  Public

router.route("/details").get(controllers.getRoleDetails);
router.route("/detail/:id").get(controllers.getRoleDetail);
router.route("/skills").get(controllers.getRoleSkills);
router.route("/skill/:id").get(controllers.getRoleSkills);

module.exports = router;