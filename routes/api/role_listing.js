const express = require('express');
const controllers = require('../../controllers/rolesController');
const router = express.Router();


// @route   GET api/roles
// @desc    Test route
// @access  Public
router.route("/details").get(controllers.getRoleListings);
router.route("/details/:id").get(controllers.getRoleListing);
router.route("/updaters").get(controllers.getRoleListingUpdaters);
router.route("/updater/:id").get(controllers.getRoleListingUpdater);
router.route("/managers").get(controllers.getRoleListingManagers);
router.route("/manager/:id").get(controllers.getRoleListingManager);

module.exports = router;