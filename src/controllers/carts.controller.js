const Cart = require('../models/cart.model');

/*crear carrito*/
const createCart = async (req, res) => {
  try {
    const newCart = new Cart({ products: [] });
    await newCart.save();
    res.status(201).json({ status: 'success', payload: newCart });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: 'error', message: 'Error al crear el carrito' });
  }
};
/*populate*/
const getCartById = async (req, res) => {
  try {
    const { cid } = req.params;
    const cart = await Cart.findById(cid).populate('products.product');
    if (!cart) return res.status(404).json({ status: 'error', message: 'Carrito no encontrado' });

    res.json({ status: 'success', payload: cart });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: 'error', message: 'Error al obtener el carrito' });
  }
};

/*agregar prod. al carrito*/
const addProductToCart = async (req, res) => {
  try {
    const { cid, pid } = req.params;

    const cart = await Cart.findById(cid);
    if (!cart) return res.status(404).json({ status: 'error', message: 'Carrito no encontrado' });

    const existingProduct = cart.products.find(p => p.product.toString() === pid);
    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      cart.products.push({ product: pid, quantity: 1 });
    }

    await cart.save();
    res.json({ status: 'success', message: 'Producto agregado al carrito', payload: cart });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: 'error', message: 'Error al agregar producto al carrito' });
  }
};

/*eliminar un producto*/
const deleteProductFromCart = async (req, res) => {
  try {
    const { cid, pid } = req.params;
    const cart = await Cart.findById(cid);
    if (!cart) return res.status(404).json({ status: 'error', message: 'Carrito no encontrado' });

    cart.products = cart.products.filter(item => item.product.toString() !== pid);
    await cart.save();

    res.json({ status: 'success', message: 'Producto eliminado del carrito', payload: cart });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: 'error', message: 'Error al eliminar producto del carrito' });
  }
};


const updateCartProducts = async (req, res) => {
  try {
    const { cid } = req.params;
    const { products } = req.body;

    if (!Array.isArray(products)) {
      return res.status(400).json({ status: 'error', message: 'productos' });
    }

    const cart = await Cart.findById(cid);
    if (!cart) return res.status(404).json({ status: 'error', message: 'Carrito no encontrado' });

   /*actualizar productos*/
    cart.products = products.map(p => ({
      product: p.product,
      quantity: p.quantity > 0 ? p.quantity : 1
    }));

    await cart.save();

    res.json({ status: 'success', message: 'Carrito actualizado', payload: cart });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: 'error', message: 'Error al actualizar el carrito' });
  }
};

/*actualizar cantidad del producto*/
const updateProductQuantity = async (req, res) => {
  try {
    const { cid, pid } = req.params;
    const { quantity } = req.body;

    if (typeof quantity !== 'number' || quantity < 1) {
      return res.status(400).json({ status: 'error', message: 'Cantidad inválida' });
    }

    const cart = await Cart.findById(cid);
    if (!cart) return res.status(404).json({ status: 'error', message: 'no se encuentra el carrito' });

    const productInCart = cart.products.find(p => p.product.toString() === pid);
    if (!productInCart) {
      return res.status(404).json({ status: 'error', message: 'No se encuetra el producto en el carrito' });
    }

    productInCart.quantity = quantity;
    await cart.save();

    res.json({ status: 'success', message: 'actualizado', payload: cart });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: 'error', message: 'Error al actualizar la cantidad' });
  }
};

/*eliminar todos los productos del carrito*/
const deleteAllProductsFromCart = async (req, res) => {
  try {
    const { cid } = req.params;
    const cart = await Cart.findById(cid);
    if (!cart) return res.status(404).json({ status: 'error', message: 'error' });

    cart.products = [];
    await cart.save();

    res.json({ status: 'success', message: 'de vacio el carrito', payload: cart });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: 'error', message: 'Error al vaciar el carrito' });
  }
};

module.exports = {
  createCart,
  getCartById,
  addProductToCart,
  deleteProductFromCart,
  updateCartProducts,
  updateProductQuantity,
  deleteAllProductsFromCart
};





