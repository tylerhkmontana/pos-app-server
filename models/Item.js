const mongoose = require('mongoose')

const Item = mongoose.model('Item', new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  orderType: {
    type: Array,
    trim: true,
    required: true
  },
  category_id: {
    type: String,
    trim: true,
    required: true
  }
}, { timestamps: true }))

module.exports = Item 