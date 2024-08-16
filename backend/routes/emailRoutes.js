const express = require('express');
const { sendBulkEmail } = require('../controllers/emailController');
const { protect, restrictTo } = require('../middlewares/authMiddleware');

const router = express.Router();

router.route('/bulk').post(protect, restrictTo('management'), sendBulkEmail);

module.exports = router;
