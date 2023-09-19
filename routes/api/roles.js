const express = require('express');
const controllers = require('../../controllers/rolesController');
const router = express.Router();


// @route   GET api/roles
// @desc    Test route
// @access  Public
router.route("/").get(controllers.getRoles);
router.route("/:id").get(controllers.getRole);

module.exports = router;