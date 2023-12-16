const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  // Load and send the `index.html` file
  res.sendFile(path.join(__dirname, './index.html'));
});

module.exports = router;
