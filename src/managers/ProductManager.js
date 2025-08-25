const fs = require('fs').promises;
const crypto = require('crypto');
const path = './data/products.json';


class ProductManager {
constructor(filepath){
    this.filepath = filepath;
}

  async readFile() {
    try {
      const data = await fs.readFile(this.filepath, 'utf-8');
      return JSON.parse(data);
    } catch (error){
      if (error.code === "ENOENT") {
        await this.saveFile([]);
         return [];
      }
      throw error;
    }
  }
  
  async saveFile(products) {
    await fs.writeFile(this.filepath, JSON.stringify(products, null, 2), "utf8");
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
    const newId = products.length > 0 ? products[products.length - 1].id + 1 : 1;
    const newProduct = { id: newId, ...product };
    products.push(newProduct);
    await this.writeFile(products);
    return newProduct;
  }

  async updateProduct(id, updates) {
    const products = await this.readFile();
    const index = products.findIndex(p => p.id == id);
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
  throw new Error("No se enceuentra el producto");
}
await this.writeFile(filtered);
return true;
  }
}

module.exports = ProductManager;
