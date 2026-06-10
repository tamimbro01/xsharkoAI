const express = require('express');
const { googleAuth, logoutUser, getProfile } = require('../controllers/auth.controllers');
const isAuthorized = require('../middleware/isAuthorized');



const router = express.Router();


router.post("/google", googleAuth)
router.get("/logout", logoutUser)
router.get("/me", isAuthorized, getProfile)



module.exports = router;