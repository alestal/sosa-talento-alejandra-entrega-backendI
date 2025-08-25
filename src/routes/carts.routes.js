const express = require('express');
const router = express.Router();
const CartManager = require('../managers/CartsManager');
const managerCart = new CartManager();

router.post('/', async (req, res) => {
  const newCart = await managerCart.createCart();
  res.status(200).json(newCart);
});

router.get('/:cid', async (req, res) => {
  const cart = await managerCart.getById(req.params.cid);
  if (cart) res.json(cart.products);
  else res.status(404).json({ error:"No se encuentra el carrito"
   });
});

router.post('/:cid/product/:pid', async (req, res) => {
  const cart = await managerCart.addProductToCart(req.params.cid, req.params.pid);
  if (cart) res.json(cart);
  else res.status(404).json({ error: "No se encuentra el carrito" });
});

module.exports = router;