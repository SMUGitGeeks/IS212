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
router.route("/applications/").get(controllers.getRoleListingApplications);
router.route("/applications/:id").get(controllers.getRoleListingApplication);


// @route   POST api/role_listing/create
// @desc    Test route
// @access  Public

router.route("/").post(controllers.createRoleListing);


// @route   PUT api/role_listing/update
// @desc    Test route
// @access  Public

router.route("/:id").put(controllers.updateRoleListing);


module.exports = router;