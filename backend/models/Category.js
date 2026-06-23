const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Category name is required'],
    },
    slug: {
      type: String,
      required: [true, 'Slug is required'],
      lowercase: true,
    },
    description: {
      type: String,
      default: '',
    },
    parent: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      default: null,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Category', categorySchema);