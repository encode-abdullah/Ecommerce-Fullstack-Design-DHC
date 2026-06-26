require('dns').setServers(['8.8.8.8','8.8.4.4']);
require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('./models/Product');
const Category = require('./models/Category');
async function run() {
  await mongoose.connect(process.env.MONGO_URI);
  const smartHome = await Category.findOne({name:'Smart Home',parent:null});
  const subs = await Category.find({parent:smartHome._id});
  for (const sub of subs) {
    const count = await Product.countDocuments({category:sub._id});
    console.log(sub.name + ' (' + sub._id + '): ' + count + ' products');
    const prods = await Product.find({category:sub._id}).select('name category').limit(2);
    prods.forEach(p => console.log('  - ' + p.name + ' (cat: ' + p.category + ')'));
  }
  // Also check if any products have category set to Smart Home directly
  const directCount = await Product.countDocuments({category:smartHome._id});
  console.log('Direct Smart Home products: ' + directCount);
  await mongoose.disconnect();
}
run();
