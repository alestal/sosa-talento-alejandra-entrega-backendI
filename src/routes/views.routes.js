const express = require('express');
const router = express.Router();
const path = require("path");
const ProductManager = require('../managers/ProductManager');

const productsFilePath = path.join(__dirname, "../data/products.json");
const manager = new ProductManager(productsFilePath);

/*pag de home*/
router.get("/home", async (req, res) => {
  try {
    const products = await manager.getProducts();
    res.render("pages/home", { products });
  } catch (error) {
    console.error("Error", error);
    res.status(500).send("Error al cargar la página de inicio.");
  }
});



/* pag realtime*/
router.get('/realtimeproducts', async (req, res) => {
  try {
    const products = await manager.getProducts();
    res.render('pages/realTimeProducts', { products });
  } catch (error) {
    console.error("Error al renderizar /realtimeproducts:", error);
    res.status(500).send("Error al cargar la página en realTime.");
  }
});



router.get('/accesorios', (req, res) => {
  res.render('pages/accesorios');
});

router.get('/carrito', (req, res) => {
  res.render('pages/carrito');
});

router.get('/maquillaje', (req, res) => {
  res.render('pages/maquillaje');
});

router.get('/perfumes', (req, res) => {
  res.render('pages/perfumes');
});

module.exports = router;




