const Product = require("../models/product.model");

function validateProductFields(product) {
  const requiredFields = ['title', 'description', 'category', 'code', 'price', 'stock'];

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

  
  if (product.thumbnails && typeof product.thumbnails !== 'string') {
    throw new Error("El campo thumbnails debe ser una cadena de texto.");
  }
}

module.exports = validateProductFields;
