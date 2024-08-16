const express = require('express');
const { sendBulkWhatsApp } = require('../controllers/whatsappController');
const { protect, restrictTo } = require('../middlewares/authMiddleware');

const router = express.Router();

router.route('/bulk').post(protect, restrictTo('management'), sendBulkWhatsApp);

module.exports = router;
