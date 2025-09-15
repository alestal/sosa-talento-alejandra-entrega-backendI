const express = require('express');
const router = express.Router();
const ProductManager = require('../managers/ProductManager');

const manager = new ProductManager();

/*estatic*/
router.get('/', async (req, res) => {
  const products = await manager.getAll();
  res.render('home', { products });
});

/*websocket*/
router.get('/realtimeproducts', async (req, res) => {
  const products = await manager.getAll();
  res.render('realTimeProducts', { products });
});

module.exports = router;
