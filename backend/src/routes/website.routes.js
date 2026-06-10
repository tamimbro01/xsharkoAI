const express = require('express');
const isAuthorized = require('../middleware/isAuthorized')
const { generateWebsite, getAllWebsites, getWebsiteById, changeWebsite, deployWebsite, getBySlug } = require('../controllers/website.controllers')

const router = express.Router();


router.post("/generate", isAuthorized, generateWebsite)
router.post("/update/:id", isAuthorized, changeWebsite)
router.get("/getbyid/:id", isAuthorized, getWebsiteById);
router.get("/getbyslug/:slug", getBySlug);
router.get("/getall", isAuthorized, getAllWebsites)
router.get("/deploy/:id", isAuthorized, deployWebsite)

module.exports = router; 