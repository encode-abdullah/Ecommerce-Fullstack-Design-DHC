require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('../config/db');
const Product = require('../models/Product');

async function main() {
  await connectDB();
  const products = await Product.find({price: 10}).select('name price');
  console.log('Products still at $10:', products.length);
  products.forEach(p => console.log(' -', p.name));
  process.exit(0);
}
main().catch(e => { console.error(e); process.exit(1); });
