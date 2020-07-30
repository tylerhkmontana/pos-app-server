const mongoose = require('mongoose')

const TableSetting = mongoose.model('TableSetting', new mongoose.Schema({
  section: {
    type: String,
    required: true
  },
  size_x: {
    type: Number,
    required: true
  },
  size_y: {
    type: Number,
    required: true
  },
  tableStructure: {
    type: Array,
    required: true
  }
}, { timestamps: true }))

module.exports = TableSetting