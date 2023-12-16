const express = require('express');

const Product = require('../models/product'); // Your product model

const router = express.Router();

router.get('/product', async (req, res) => {
  const products = await Product.find({}); // Fetch all products

  res.json({ products });
});

// Implement logic for other shop functionalities like filtering, searching, etc.

module.exports = router;
