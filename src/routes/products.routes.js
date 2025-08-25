const express = require('express');
const router = express.Router();
const ProductManager = require('../managers/ProductManager');
const managerProduct= new ProductManager();


router.get('/', async (req, res) => {
  const products = await managerProduct.getAll();
  res.json(products);
});



router.get('/:pid', async (req, res) => {
  const product = await managerProduct.getById(req.params.pid);
  if (product) res.json(product);
  else res.status(404).json({ error: "No se han encontrado resultados"});
});



router.post('/', async (req, res) => {
  const { title, description, code, price, status = true, stock, category, thumbnails } = req.body;

  if (!id || !title || !description || !code || !price || !status|| stock === null || !category===string || !Array.isArray(thumbnails)) {
    return res.status(400).json({ error: "Faltan datos obligatorios" });
  }

  const managerProduct = await managerProduct.addProduct({id, title, description, code, price, status, stock, category, thumbnails });
  res.status(200).json(managerProduct);
});


router.put('/:pid', async (req, res) => {
  const updated = await managerProduct.updateProduct(req.params.pid, req.body);
  if (updated) res.json(updated);
  else res.status(404).json({ error: "No se han encontrado resultados" });
});

router.delete('/:pid', async (req, res) => {
  const success = await managerProduct.deleteProduct(req.params.pid);
  if (success) res.json({ message: "El producto ha sido eliminado" });
  else res.status(404).json({ error: "No se han encontrado resultados" });
});

module.exports = router;