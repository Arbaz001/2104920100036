const express = require('express');
const router = express.Router();
const AnalyticsController = require('../controllers/AnalyticsController');

// Get top users
router.get('/users', AnalyticsController.getTopUsers);

// Get posts (latest or popular)
router.get('/posts', AnalyticsController.getPosts);

module.exports = router;