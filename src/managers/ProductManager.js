const fs = require('fs').promises;
const crypto = require('crypto');
const path = './data/products.json';


class ProductManager {
  constructor(filepath) {
    this.filepath = filepath;
  }

  async readFile() {
    try {
      const data = await fs.readFile(this.filepath, 'utf-8');
      return JSON.parse(data);
    } catch (error) {
      if (error.code === "ENOENT") {
        await this.writeFile([]);
        return [];
      }
      throw error;
    }
  }

  async writeFile(data) {
    try {
      await fs.writeFile(this.filepath, JSON.stringify(data, null, 2));
    } catch (error) {
      console.error("Archivo con error:", error);
      throw error;
    }
  }

  async getProducts() {
    return await this.readFile();
  }

  async getProductById(id) {
    const products = await this.readFile();
    return products.find(p => p.id === id);
  }

  generateId() {
    return crypto.randomUUID();
  }

  async addProduct(product) {
    const products = await this.readFile();
    const newId = this.generateId();
    const newProduct = { id: newId, ...product };
    products.push(newProduct);
    await this.writeFile(products);
    return newProduct;
  }

  async updateProduct(id, updates) {
    const products = await this.readFile();
    const index = products.findIndex(p => p.id === id
);
    if (index === -1) return null;
    const updatedProduct = { ...products[index], ...updates, id: products[index].id };
    products[index] = updatedProduct;
    await this.writeFile(products);
    return updatedProduct;
  }

  async deleteProduct(id) {
    const products = await this.readFile();
    const filtered = products.filter(p => p.id != id);
    if (filtered.length === products.length) {
      throw new Error("No se encuentra el producto");
    }
    await this.writeFile(filtered);
    return true;
  }
}

module.exports = ProductManager;






/*para proyecto final 
const Product = require('../models/product.model');

class ProductManager {
  // Obtener productos con paginación, filtros y orden
  async getProducts({ limit = 10, page = 1, sort, query } = {}) {
    const options = {
      page: parseInt(page),
      limit: parseInt(limit),
      lean: true,
      sort: sort ? { price: sort === 'asc' ? 1 : -1 } : {}
    };

    const filter = {};

    if (query) {
      const queryLower = query.toLowerCase();

      if (['maquillaje', 'perfume', 'accesorios'].includes(queryLower)) {
        filter.category = queryLower;
      } else if (queryLower === 'available' || queryLower === 'true') {
        filter.available = true;
      } else if (queryLower === 'unavailable' || queryLower === 'false') {
        filter.available = false;
      } else {
        filter.$or = [
          { title: { $regex: query, $options: 'i' } },
          { description: { $regex: query, $options: 'i' } }
        ];
      }
    }

    return Product.paginate(filter, options);
  }

  // Obtener producto por id
  async getProductById(id) {
    return Product.findById(id).lean();
  }

  // Agregar producto nuevo
  async addProduct(productData) {
    const product = new Product(productData);
    return product.save();
  }

  // Actualizar producto por id
  async updateProduct(id, updateData) {
    return Product.findByIdAndUpdate(id, updateData, { new: true, lean: true });
  }

  // Eliminar producto por id
  async deleteProduct(id) {
    return Product.findByIdAndDelete(id);
  }
}

module.exports = ProductManager;*/
