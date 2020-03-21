
/**
 * requiring  third party modules
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
/**
 * creating order schema
 */
const orderSchema = new Schema({
  products: [
    {
      product: { type: Object, required: true },
      quantity: { type: Number, required: true }
    }
  ],
  user: {
    email: {
      type: String,
      required: true
    },
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User'
    }
  }
});

/**
 * exporting order schema 
 */
module.exports = mongoose.model('Order', orderSchema);
