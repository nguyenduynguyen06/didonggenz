const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  numericId: {
    type: Number,
    require: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', 
  },
  address: {
    type: String,
    require: true,
  },
  atStore: {
    type: Boolean,
    default: false,
  },
  status: {
    type: String,
    require: true,
  },
  paymentMethod: {
    type: String,
    require: true,
  },
  items: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product', 
      },
      quantity: {
        type: Number,
        require: true,
      },
      price: {
        type: Number,
        require: true,
      },
    },
  ],
  subTotal: {
    type: Number,
    require: true,
  },
  shippingFee: {
    type: Number,
    require: true,
  },
  totalPay: {
    type: Number,
    require: true,
  },
  createDate: {
    type: Date,
    default: Date.now,
  },
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
