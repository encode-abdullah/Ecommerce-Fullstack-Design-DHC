import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category: { 
    type: String, 
    required: true,
    enum: ['mouse', 'keyboard', 'headset', 'controller', 'chair', 'monitor']
  },
  brand: { type: String, required: true },
  images: [{ type: String }],
  specs: {
    type: Map,
    of: String
  },
  stock: { type: Number, required: true, default: 0 },
  rating: { type: Number, default: 0 },
  numReviews: { type: Number, default: 0 },
  reviews: [{
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    name: String,
    rating: { type: Number, required: true },
    comment: String,
    createdAt: { type: Date, default: Date.now }
  }],
  isFeatured: { type: Boolean, default: false }
}, { timestamps: true });

export default mongoose.model('Product', productSchema);