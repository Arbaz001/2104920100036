class CacheManager {
    constructor() {
      this.cache = new Map();
      this.commentCounts = new Map(); // userID -> total comments
      this.postCommentCounts = new Map(); // postID -> comment count
      this.userPosts = new Map(); // userID -> [posts]
      this.postComments = new Map(); // postID -> [comments]
      this.lastUpdated = new Map(); // cache key -> timestamp
    }
  
    // Generic cache methods
    set(key, value) {
      this.cache.set(key, value);
      this.lastUpdated.set(key, Date.now());
    }
  
    get(key) {
      return this.cache.get(key);
    }
  
    has(key) {
      return this.cache.has(key);
    }
  
    // Specialized methods for comment counts
    updateCommentCounts(userId, postId, count) {
      // Update user's total comment count
      const currentUserCount = this.commentCounts.get(userId) || 0;
      this.commentCounts.set(userId, currentUserCount + count);
      
      // Update post's comment count
      this.postCommentCounts.set(postId, count);
    }
  
    getTopUsers() {
      const usersArray = Array.from(this.commentCounts.entries())
        .sort((a, b) => b[1] - a[1]);
      return usersArray.slice(0, config.TOP_USERS_LIMIT);
    }
  
    getPopularPosts() {
      const postsArray = Array.from(this.postCommentCounts.entries())
        .sort((a, b) => b[1] - a[1]);
        
      // Find max comment count
      const maxCount = postsArray.length > 0 ? postsArray[0][1] : 0;
      
      // Return all posts with max count
      return postsArray.filter(post => post[1] === maxCount);
    }
  
    getLatestPosts() {
      const allPosts = [];
      this.userPosts.forEach(posts => {
        allPosts.push(...posts);
      });
      
      return allPosts
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, config.LATEST_POSTS_LIMIT);
    }
  }
  
  module.exports = new CacheManager();