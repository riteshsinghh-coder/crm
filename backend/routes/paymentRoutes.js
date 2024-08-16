const express = require('express');
const { createOrder, verifyPayment } = require('../controllers/paymentController');

const router = express.Router();

router.route('/create').post(createOrder);
router.route('/verify').post(verifyPayment);

module.exports = router;
