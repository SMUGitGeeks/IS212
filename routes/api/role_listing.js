const express = require('express');
const controllers = require('../../controllers/roleListingController');
const router = express.Router();


// @route   GET api/role_listing
// @desc    Test route
// @access  Public

router.route("/details/").get(controllers.getRoleListings);
router.route("/details/:id").get(controllers.getRoleListing);
router.route("/updater/:id").get(controllers.getRoleListingUpdater);
router.route("/manager/:id").get(controllers.getRoleListingManager);


// @route   POST api/role_listing/create
// @desc    Test route
// @access  Public

router.route("/create").post(controllers.createRoleListing);






module.exports = router;