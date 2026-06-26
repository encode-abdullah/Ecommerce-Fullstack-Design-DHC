require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('../config/db');
const Product = require('../models/Product');
const Category = require('../models/Category');

async function main() {
  await connectDB();
  const products = await Product.find({}).select('name description category').populate('category', 'name');
  
  let shortCount = 0;
  let emptyCount = 0;
  products.forEach(p => {
    if (!p.description || p.description.length === 0) {
      emptyCount++;
      console.log(`EMPTY: ${p.name} [${p.category?.name}]`);
    } else if (p.description.length < 100) {
      shortCount++;
      console.log(`SHORT (${p.description.length}): ${p.name} [${p.category?.name}]`);
    }
  });
  
  console.log(`\nTotal: ${products.length}, Empty: ${emptyCount}, Short (<100 chars): ${shortCount}, OK: ${products.length - emptyCount - shortCount}`);
  process.exit(0);
}
main().catch(e => { console.error(e); process.exit(1); });
