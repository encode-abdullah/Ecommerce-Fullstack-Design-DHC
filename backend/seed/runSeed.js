const dns = require('dns');
dns.setServers(['8.8.8.8', '8.8.4.4']);

require('dotenv').config();
const mongoose = require('mongoose');
const seedProducts = require('./seedProducts');

mongoose.connect(process.env.MONGO_URI).then(async () => {
  console.log('MongoDB Connected for seeding');
  await seedProducts();
  process.exit(0);
}).catch(e => {
  console.error('Connection failed:', e.message);
  process.exit(1);
});
