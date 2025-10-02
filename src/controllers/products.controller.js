const Product = require("../models/product.model");

const getProducts = async (req, res) => {
  try {
    let { limit = 10, page = 1, sort, query } = req.query;

    limit = Math.max(parseInt(limit) || 10, 1);
    page = Math.max(parseInt(page) || 1, 1);

    const filter = {};

    if (query) {
      if (query === 'available') {
        filter.available = true;
      } else if (['maquillaje', 'perfume', 'accesorios'].includes(query)) {
        filter.category = query;
      }
    }

    const sortOption = {};
    if (sort === 'asc') sortOption.price = 1;
    else if (sort === 'desc') sortOption.price = -1;

    const options = {
      page,
      limit,
      sort: Object.keys(sortOption).length ? sortOption : undefined
    };

    const result = await Product.paginate(filter, options);

    const buildLink = (pageNum) => {
      if (!pageNum) return null;
      const params = new URLSearchParams({ page: pageNum, limit });
      if (sort) params.append('sort', sort);
      if (query) params.append('query', query);
      return `/api/products?${params.toString()}`;
    };

    res.json({
      status: 'success',
      payload: result.docs,
      totalPages: result.totalPages,
      prevPage: result.prevPage,
      nextPage: result.nextPage,
      page: result.page,
      hasPrevPage: result.hasPrevPage,
      hasNextPage: result.hasNextPage,
      prevLink: result.hasPrevPage ? buildLink(result.prevPage) : null,
      nextLink: result.hasNextPage ? buildLink(result.nextPage) : null
    });

  } catch (error) {
    console.error('Error al obtener productos:', error);
    res.status(500).json({ status: 'error', message: 'Error interno del servidor' });
  }
};


const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.pid);
    if (!product) return res.status(404).json({ status: 'error', message: 'Producto no encontrado' });

    res.json({ status: 'success', product });
  } catch (error) {
    res.status(500).json({ status: 'error', message: 'Error al obtener producto por ID' });
  }
};


const createProduct = async (req, res) => {
  try {
    const newProduct = await Product.create(req.body);
    res.status(201).json({ status: 'success', product: newProduct });
  } catch (error) {
    res.status(400).json({ status: 'error', message: 'Error al crear producto', error: error.message });
  }
};


const updateProduct = async (req, res) => {
  try {
    const updated = await Product.findByIdAndUpdate(req.params.pid, req.body, { new: true });
    if (!updated) return res.status(404).json({ status: 'error', message: 'Producto no encontrado' });

    res.json({ status: 'success', product: updated });
  } catch (error) {
    res.status(400).json({ status: 'error', message: 'Error al actualizar producto', error: error.message });
  }
};


const deleteProduct = async (req, res) => {
  try {
    const deleted = await Product.findByIdAndDelete(req.params.pid);
    if (!deleted) return res.status(404).json({ status: 'error', message: 'Producto no encontrado' });

    res.json({ status: 'success', message: 'Producto eliminado' });
  } catch (error) {
    res.status(400).json({ status: 'error', message: 'Error al eliminar producto', error: error.message });
  }
};

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
};


