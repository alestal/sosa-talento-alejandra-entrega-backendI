const express = require('express');
const router = express.Router();
const Product = require('../models/product.model');
const Cart = require('../models/cart.model');

/*paginacion*/


router.get('/products', async (req, res) => {
  try {
    let { page = 1, limit = 10, sort, query } = req.query;
    page = parseInt(page);
    limit = parseInt(limit);

    /*filtro por categoria*/
  const filter = {};
    if (query && query !== '') {
       filter.category = new RegExp(`^${query}$`, 'i');
    }
    const options = {
      page,
      limit,
      lean: true
    };

    /*orden por precio*/
    if (sort === 'asc') {
      options.sort = { price: 1 };
    } else if (sort === 'desc') {
      options.sort = { price: -1 };
    }

    const result = await Product.paginate(filter, options);

   const categories = ['perfumes', 'maquillaje', 'accesorios'];

    res.render('pages/products', {
      products: result.docs,
      page: result.page,
      totalPages: result.totalPages,
      hasPrevPage: result.hasPrevPage,
      hasNextPage: result.hasNextPage,
      prevLink: result.hasPrevPage ? `/products?page=${result.page - 1}&limit=${limit}&sort=${sort || ''}&query=${query || ''}` : null,
      nextLink: result.hasNextPage ? `/products?page=${result.page + 1}&limit=${limit}&sort=${sort || ''}&query=${query || ''}` : null,
      sort,
      query,
      categories
    });
  } catch (error) {
    console.error('Error cargando productos:', error);
    res.status(500).send('Error al cargar productos');
  }
});

/* Detalle de producto individual*/
router.get('/products/:pid', async (req, res) => {
  try {
    const product = await Product.findById(req.params.pid).lean();
    if (!product) return res.status(404).send('Producto no encontrado');
    res.render('pages/productDetails', { product });
  } catch (error) {
    console.error('Error cargando detalle de producto:', error);
    res.status(500).send('Error interno');
  }
});

/* Carrito con productos populados*/
router.get('/carts/:cid', async (req, res) => {
  try {
    const cart = await Cart.findById(req.params.cid).populate('products.product');
    if (!cart) return res.status(404).send('Carrito no encontrado');
    res.render('pages/carrito', { cart });
  } catch (error) {
    console.error('Error cargando carrito:', error);
    res.status(500).send('Error al cargar el carrito');
  }
});

/* Real Time Products */
router.get('/realtimeproducts', (req, res) => {
  res.render('pages/realTimeProducts');
});

module.exports = router;
