const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  products: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
      },
      quantity: {
        type: Number,
        default: 1,
        min: [1, 'La cantidad debe ser al menos 1']
      }
    }
  ]
}, {
  timestamps: true
});

module.exports = mongoose.models.Cart || mongoose.model('Cart', cartSchema);
