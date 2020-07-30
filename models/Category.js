const mongoose = require('mongoose')

const Category = mongoose.model('Category', new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    uppercase: true,
    required: true
  },
  orderType: {
    type: String,
    trim: true,
    uppercase: true,
    required: true
  }
}, { timestamps: true }))

module.exports = Category