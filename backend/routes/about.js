const express = require('express');
const router = express.Router();

router.get('/about', (req, res) => {
  // Load and send the `about.html` file
  res.sendFile(path.join(__dirname, './about.html'));
});

module.exports = router;
