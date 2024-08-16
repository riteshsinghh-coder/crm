const express = require('express');
const { getUsers, getUserById, createUser } = require('../controllers/userController');
const { protect, restrictTo } = require('../middlewares/authMiddleware');

const router = express.Router();

router.route('/').get(protect, restrictTo('management'), getUsers);
router.route('/:id').get(protect, restrictTo('management'), getUserById);
router.route('/').post(protect, restrictTo('management'), createUser);

module.exports = router;
