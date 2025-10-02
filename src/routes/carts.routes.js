const express = require('express');
const mongoose = require('mongoose'); 
const router = express.Router();
const Cart = require('../models/cart.model'); 




/*se crea carrito*/
router.post('/new', async (req, res) => {
  try {
    const newCart = await Cart.create({ products: [] });
    res.json({ status: 'success', cartId: newCart._id });
  } catch (error) {
    console.error('Error creando carrito:', error);
    res.status(500).json({ status: 'error', message: 'Error al crear el carrito' });
  }
});

/*populate*/
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


/*agregar producto*/
router.post('/:cid/products/:pid', async (req, res) => {
  const { cid, pid } = req.params;

  if (!mongoose.Types.ObjectId.isValid(cid) || !mongoose.Types.ObjectId.isValid(pid)) {
    return res.status(400).json({ status: 'error', message: 'ID inválido' });
  }

  try {
    const cart = await Cart.findById(cid);
    if (!cart) return res.status(404).json({ status: 'error', message: 'Carrito no encontrado' });

    const existingProduct = cart.products.find(p => p.product.toString() === pid);
    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      cart.products.push({ product: pid, quantity: 1 });
    }

    await cart.save();
    res.json({ status: 'success', payload: cart });
  } catch (error) {
    console.error('Error agregando producto:', error);
    res.status(500).json({ status: 'error', message: 'Error al agregar producto al carrito' });
  }
});

/*Eliminar prodicto*/
router.delete('/:cid/products/:pid', async (req, res) => {
  const { cid, pid } = req.params;

  if (!mongoose.Types.ObjectId.isValid(cid) || !mongoose.Types.ObjectId.isValid(pid)) {
    return res.status(400).json({ status: 'error', message: 'ID inválido' });
  }

  try {
    const cart = await Cart.findById(cid);
    if (!cart) return res.status(404).json({ status: 'error', message: 'Carrito no encontrado' });

    cart.products = cart.products.filter(p => p.product.toString() !== pid);
    await cart.save();

    res.json({ status: 'success', payload: cart });
  } catch (error) {
    console.error('Error eliminando producto:', error);
    res.status(500).json({ status: 'error', message: 'Error eliminando producto del carrito' });
  }
});

/*Actualiza la cantidad en el carrito*/
router.put('/:cid/products/:pid', async (req, res) => {
  const { cid, pid } = req.params;
  const { quantity } = req.body;

  if (!mongoose.Types.ObjectId.isValid(cid) || !mongoose.Types.ObjectId.isValid(pid)) {
    return res.status(400).json({ status: 'error', message: 'ID inválido' });
  }

  if (!quantity || quantity < 1) {
    return res.status(400).json({ status: 'error', message: 'Cantidad inválida' });
  }

  try {
    const cart = await Cart.findById(cid);
    if (!cart) return res.status(404).json({ status: 'error', message: 'Carrito no encontrado' });

    const item = cart.products.find(p => p.product.toString() === pid);
    if (!item) return res.status(404).json({ status: 'error', message: 'Producto no encontrado en el carrito' });

    item.quantity = quantity;
    await cart.save();

    res.json({ status: 'success', payload: cart });
  } catch (error) {
    console.error('Error actualizando cantidad:', error);
    res.status(500).json({ status: 'error', message: 'Error actualizando cantidad del producto' });
  }
});


module.exports = router;
