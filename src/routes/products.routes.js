const express = require('express');
const router = express.Router();

const {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
} = require('../controllers/products.controller');

router.get('/', getProducts);
router.get('/:pid', getProductById);
router.post('/', createProduct);
router.put('/:pid', updateProduct);
router.delete('/:pid', deleteProduct);

/*io*/
const { io } = require('../app');
router.post('/', async (req, res) => {
  const newProduct = await productManager.addProduct(req.body);
  const updatedProducts = await productManager.getProducts();
  io.emit('productList', updatedProducts);
  res.status(202).json(newProduct);
});



module.exports = router;




