const axios = require('axios');
const config = require('../config/config');
const cache = require('../models/CacheManager');

class SocialMediaService {
  async fetchUsers() {
    try {
      const response = await axios.get(`${config.API_BASE_URL}/users`);
      return response.data.users;
    } catch (error) {
      console.error('Error fetching users:', error);
      throw error;
    }
  }

  async fetchUserPosts(userId) {
    try {
      const response = await axios.get(`${config.API_BASE_URL}/users/${userId}/posts`);
      return response.data.posts;
    } catch (error) {
      console.error(`Error fetching posts for user ${userId}:`, error);
      throw error;
    }
  }

  async fetchPostComments(postId) {
    try {
      const response = await axios.get(`${config.API_BASE_URL}/posts/${postId}/comments`);
      return response.data.comments || [];
    } catch (error) {
      console.error(`Error fetching comments for post ${postId}:`, error);
      throw error;
    }
  }

  async refreshAllData() {
    try {
      // Fetch all users
      const users = await this.fetchUsers();
      
      // Process each user's posts and comments
      for (const [userId, userName] of Object.entries(users)) {
        const posts = await this.fetchUserPosts(userId);
        cache.userPosts.set(userId, posts);
        
        // Process each post's comments
        for (const post of posts) {
          const comments = await this.fetchPostComments(post.id);
          cache.postComments.set(post.id, comments);
          cache.updateCommentCounts(userId, post.id, comments.length);
        }
      }
      
      return true;
    } catch (error) {
      console.error('Error refreshing all data:', error);
      throw error;
    }
  }
}

module.exports = new SocialMediaService();