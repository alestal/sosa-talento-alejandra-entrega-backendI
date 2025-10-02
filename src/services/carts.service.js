const express = require('express');
const router = express.Router();

const {
  createCart,
  getCartById,
  addProductToCart,
  deleteProductFromCart,
  deleteAllProductsFromCart,
  updateCartProducts,
  updateProductQuantity
} = require('../controllers/carts.controller');

router.post('/', createCart);
router.get('/:cid', getCartById);
router.post('/:cid/product/:pid', addProductToCart);

router.delete('/:cid/products/:pid', deleteProductFromCart);
router.delete('/:cid', deleteAllProductsFromCart);
router.put('/:cid', updateCartProducts);
router.put('/:cid/products/:pid', updateProductQuantity);

module.exports = router;
