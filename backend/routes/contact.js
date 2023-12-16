const express = require('express');
const router = express.Router();

router.get('/contact', (req, res) => {
  // Load and send the `contact.html` file
  res.sendFile(path.join(__dirname, './contact.html'));
});

module.exports = router;
