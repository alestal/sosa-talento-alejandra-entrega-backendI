const ProductManager = require("../managers/ProductManager");
const productManager = new ProductManager(); 


const getProducts = async (req, res) => {
  try {
    const products = await productManager.getProducts();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los productos', details: error.message });
  }
};

const getProductById = async (req, res) => {
  try {
    const product = await productManager.getProductById(req.params.pid);
    if (!product) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el producto', details: error.message });
  }
};


const createProduct = async (req, res) => {
  try {
    const newProduct = await productManager.addProduct(req.body);
    res.status(201).json({ message: 'Producto creado', product: newProduct });
  } catch (error) {
    res.status(400).json({ error: 'Error al crear el producto', details: error.message });
  }
};

const updateProduct = async (req, res) => {
  try {
    const updated = await productManager.updateProduct(req.params.pid, req.body);
    if (!updated) {
      return res.status(404).json({ error: 'No se ha encontrado el producto' });
    }
    res.status(200).json({ message: 'se ha actualizado el producto correctamente', product: updated });
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el producto', details: error.message });
  }
};


const deleteProduct = async (req, res) => {
  try {
    await productManager.deleteProduct(req.params.pid);
    res.status(200).json({ message: 'Producto eliminado' });
  } catch (error) {
    res.status(404).json({ error: 'Error al eliminar el producto', details: error.message });
  }
};

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
};

