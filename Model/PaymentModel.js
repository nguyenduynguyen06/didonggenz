const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  order: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Order', 
    require: true,
  },
  desc: {
    type: String,
  },
  paidDate: {
    type: Date,
  },
  total: {
    type: Number,
    require: true,
  },
});

const Payment = mongoose.model('Payment',paymentSchema);

module.exports = Payment;
