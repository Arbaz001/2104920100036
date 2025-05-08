const express = require('express');
const cors = require('cors');
const apiRoutes = require('./routes/apiRoutes');
const SocialMediaService = require('./services/SocialMediaService');
const config = require('./config/config');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/', apiRoutes);

// Initial data load
async function initialize() {
  try {
    console.log('Initializing data...');
    await SocialMediaService.refreshAllData();
    console.log('Data initialization complete');
  } catch (error) {
    console.error('Initialization failed:', error);
    process.exit(1);
  }
}

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  initialize();
});

// Periodic data refresh
setInterval(async () => {
  try {
    await SocialMediaService.refreshAllData();
    console.log('Data refreshed at', new Date());
  } catch (error) {
    console.error('Data refresh failed:', error);
  }
}, config.CACHE_TTL);

module.exports = app;