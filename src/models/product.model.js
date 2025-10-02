const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  category: {
    type: String,
    required: true,
    enum: ['maquillaje', 'perfume', 'accesorios']
  },
  stock: {
    type: Number,
    required: true,
    min: 0
  },
  available: {
    type: Boolean,
    default: true, 
  },
  thumbnails: {
    type: String,  
    default: null
  }
}, {
  timestamps: true
});

productSchema.pre('save', function(next) {
  this.available = this.stock > 0;
  next();
});

// Agrego plugin de paginación
productSchema.plugin(mongoosePaginate);

module.exports = mongoose.models.Product || mongoose.model('Product', productSchema);
