const express = require('express');
const controllers = require('../../controllers/roleListingController');
const router = express.Router();


// @route   GET api/roles
// @desc    Test route
// @access  Public

// GET Methods
router.route("/details/").get(controllers.getRoleListings);
router.route("/details/:id").get(controllers.getRoleListing);
router.route("/updater/:id").get(controllers.getRoleListingUpdater);
router.route("/manager/:id").get(controllers.getRoleListingManager);







module.exports = router;