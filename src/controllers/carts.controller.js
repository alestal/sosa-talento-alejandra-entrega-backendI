const CartManager = require('../managers/CartManager');
const cartManager = new CartManager();


const createCart = async (req, res) => {
  try {
    const newCart = await cartManager.createCart();
    res.status(201).json({ message: 'Carrito creado', cart: newCart });
  } catch (error) {
    res.status(500).json({
      error: 'Error al crear el carrito',
      details: error.message
    });
  }
};

const getCartById = async (req, res) => {
  try {
    const cart = await cartManager.getById(req.params.cid);

    if (!cart) {
      return res.status(404).json({ error: 'Carrito no encontrado' });
    }

    res.status(200).json(cart.products);
  } catch (error) {
    res.status(500).json({
      error: 'Error al obtener el carrito',
      details: error.message
    });
  }
};


const addProductToCart = async (req, res) => {
  try {
    const updatedCart = await cartManager.addProductToCart(
      req.params.cid,
      req.params.pid
    );

    if (!updatedCart) {
      return res.status(404).json({
        error: 'Carrito no encontrado o error al agregar el producto'
      });
    }

    res.status(200).json({
      message: 'Producto agregado al carrito',
      cart: updatedCart
    });
  } catch (error) {
    res.status(500).json({
      error: 'Error al agregar el producto al carrito',
      details: error.message
    });
  }
};

module.exports = {
  createCart,
  getCartById,
  addProductToCart
};
