const express = require('express');
const router = express.Router();

router.get('/profile', (req, res) => {
  // Logic to retrieve user profile will go here
  res.json({ message: "Profile endpoint" });
});

// Export the router for use in index.js
module.exports = router;
