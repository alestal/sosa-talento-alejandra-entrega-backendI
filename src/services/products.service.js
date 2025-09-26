const path = require("path");
const ProductManager = require("../managers/ProductManager");

const manager = new ProductManager(path.join(__dirname, "../data/products.json"));

function validateProductFields(product) {
  const requiredFields = ['title', 'description', 'category', "code",'price', 'stock'];

  const missingFields = requiredFields.filter(field =>
    product[field] === undefined || product[field] === null || product[field] === ''
  );

  if (missingFields.length > 0) {
    throw new Error(`Campos faltantes: ${missingFields.join(', ')}`);
  }

  if (typeof product.price !== 'number' || isNaN(product.price)) {
    throw new Error("El precio debe ser un número válido.");
  }

  if (typeof product.stock !== 'number' || isNaN(product.stock)) {
    throw new Error("El stock debe ser un número válido.");
  }
}

const ProductService = {
  async getProducts() {
    return await manager.getProducts();
  },

  async add(product) {
    validateProductFields(product);
    return await manager.addProduct(product);
  },

  async delete(id) {
    return await manager.deleteProduct(id);
  }
};

module.exports = ProductService;
