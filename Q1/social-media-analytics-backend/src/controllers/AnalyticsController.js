const SocialMediaService = require('../services/SocialMediaService');
const cache = require('../models/CacheManager');
const config = require('../config/config');

class AnalyticsController {
  async getTopUsers(req, res) {
    try {
      // Check if we need to refresh data
      if (!cache.has('users') || 
          Date.now() - cache.lastUpdated.get('users') > config.CACHE_TTL) {
        await SocialMediaService.refreshAllData();
        cache.set('users', true);
      }
      
      const topUsers = cache.getTopUsers();
      res.json({ topUsers });
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch top users' });
    }
  }

  async getPosts(req, res) {
    try {
      const type = req.query.type || 'latest';
      
      // Check if we need to refresh data
      if (!cache.has('posts') || 
          Date.now() - cache.lastUpdated.get('posts') > config.CACHE_TTL) {
        await SocialMediaService.refreshAllData();
        cache.set('posts', true);
      }
      
      let result;
      if (type === 'popular') {
        result = cache.getPopularPosts();
      } else {
        result = cache.getLatestPosts();
      }
      
      res.json({ posts: result });
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch posts' });
    }
  }
}

module.exports = new AnalyticsController();