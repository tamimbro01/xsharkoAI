const express = require('express');
const isAuthorized = require('../middleware/isAuthorized');
const { createOrder, verifyPayment } = require('../controllers/payment.controllers');



const router = express.Router();


router.post("/order", isAuthorized, createOrder);
router.post("/verify", isAuthorized, verifyPayment);




module.exports = router;