const express = require('express');
const { getLeads, updateLead, assignLead, filterLeads } = require('../controllers/leadController');
const { protect, restrictTo } = require('../middlewares/authMiddleware');

const router = express.Router();

router.route('/').get(protect, getLeads);
router.route('/:id').put(protect, updateLead);
router.route('/assign/:id').put(protect, restrictTo('management'), assignLead);
router.route('/filter').get(protect, filterLeads);

module.exports = router;
