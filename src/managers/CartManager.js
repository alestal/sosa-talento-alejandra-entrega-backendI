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

