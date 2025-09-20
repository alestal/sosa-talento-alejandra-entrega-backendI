const express = require('express');
const router = express.Router();
const path = require("path");
const ProductManager = require('../managers/ProductManager');

const productsFilePath = path.join(__dirname, "..", "data", "products.json");
const manager = new ProductManager(productsFilePath);

router.get('/', async (req, res) => {
  try {
    const products = await manager.getProducts();
    res.render('pages/home', { products });  
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al cargar la página de inicio.');
  }
});

router.get('/realtimeproducts', async (req, res) => {
  try {
    const products = await manager.getProducts();
    res.render('pages/realTimeProducts', { products });  
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al cargar la página en tiempo real.');
  }
});

module.exports = router;





/*
const express = require('express');
const router = express.Router();
const path = require("path");
const ProductManager = require('../managers/ProductManager');

const productsFilePath = path.join(__dirname, "..", "data", "products.json");
const manager = new ProductManager(productsFilePath);

router.get('/', async (req, res) => {
  const products = await manager.getProducts();
  res.render('pages/home', { products });
});

router.get('/realtimeproducts', async (req, res) => {
  const products = await manager.getProducts();
  res.render('realTimeProducts', { products });
});

module.exports = router;

*/