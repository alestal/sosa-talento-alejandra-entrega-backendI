const crypto = require('crypto');
const fs = require('fs').promises;
const path = "'./data/carts.json'";

class CartManager {
  async readFile() {
    try {
      const data = await fs.readFile(path, 'utf-8');
      return JSON.parse(data);
    } catch (error) {
      return [];
    }
  }

  async writeFile(data) {
    await fs.writeFile(path, JSON.stringify(data, null, 2));
  }

  generateId() {
    return crypto.randomUUID();
  }

  async createCart() {
    const carts = await this.readFile();
    const newCart = {
      id: this.generateId(),
      products: []
    };
    carts.push(newCart);
    await this.writeFile(carts);
    return newCart;
  }

  async getById(cid) {
    const carts = await this.readFile();
    return carts.find(cart => cart.id === cid);
  }

  async addProductToCart(cid, pid) {
    const carts = await this.readFile();
    const idx = carts.findIndex(c => c.id === cid);

    if (idx === -1) return null;

    const cart = carts[idx];
    const prod = cart.products.find(p => p.product === pid);

    if (prod) {
      prod.quantity++;
    } else {
      cart.products.push({ product: pid, quantity: 1 });
    }

    carts[idx] = cart;
    await this.writeFile(carts);
    return cart;
  }
}

module.exports = CartManager;


/*para entrega final 
const Cart = require('../models/cart.model');
const Product = require('../models/product.model');

class CartManager {
  async createCart() {
    const newCart = await Cart.create({ products: [] });
    return newCart;
  }

  async getById(cid) {
    return await Cart.findById(cid).populate('products.product');
  }

  async addProductToCart(cid, pid) {
    const cart = await Cart.findById(cid);
    if (!cart) return null;

    const existingProduct = cart.products.find(p => p.product.toString() === pid);

    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      cart.products.push({ product: pid, quantity: 1 });
    }

    await cart.save();
    return cart;
  }

  async deleteProductFromCart(cid, pid) {
    const cart = await Cart.findById(cid);
    if (!cart) return null;

    cart.products = cart.products.filter(p => p.product.toString() !== pid);
    await cart.save();
    return cart;
  }

  async updateCartProducts(cid, products) {
    const cart = await Cart.findById(cid);
    if (!cart) return null;

    // Validación opcional: verificar que todos los productos existan en BD
    cart.products = products.map(p => ({
      product: p.product,
      quantity: p.quantity
    }));

    await cart.save();
    return cart;
  }

  async updateProductQuantity(cid, pid, quantity) {
    const cart = await Cart.findById(cid);
    if (!cart) return null;

    const prod = cart.products.find(p => p.product.toString() === pid);
    if (!prod) return null;

    prod.quantity = quantity;
    await cart.save();
    return cart;
  }

  async clearCart(cid) {
    const cart = await Cart.findById(cid);
    if (!cart) return null;

    cart.products = [];
    await cart.save();
    return cart;
  }
}

module.exports = CartManager;
*/