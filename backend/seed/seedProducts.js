const Product = require('../models/Product');
const Category = require('../models/Category');

const seedProducts = async () => {
  try {
    await Category.deleteMany();
    await Product.deleteMany();

    const categories = await Category.insertMany([
      { name: 'Laptops', slug: 'laptops', description: 'Gaming & Business Laptops' },
      { name: 'Mice', slug: 'mice', description: 'Gaming & Wireless Mice' },
      { name: 'Monitors', slug: 'monitors', description: 'Gaming & Professional Monitors' },
      { name: 'Keyboards', slug: 'keyboards', description: 'Mechanical & Wireless Keyboards' },
      { name: 'CPUs', slug: 'cpus', description: 'Processors' },
      { name: 'GPUs', slug: 'gpus', description: 'Graphics Cards' },
    ]);

    const products = [
      {
        name: 'ASUS ROG Strix Scar 16',
        price: 2899,
        originalPrice: 3299,
        image: 'https://picsum.photos/id/0/300/200',
        description: 'Intel Core i9-13980HX, RTX 4090',
        category: categories[0]._id,
        stock: 10,
        featured: true,
      },
      {
        name: 'Logitech G Pro X Superlight',
        price: 159,
        originalPrice: 199,
        image: 'https://picsum.photos/id/1/300/200',
        description: 'Wireless Gaming Mouse',
        category: categories[1]._id,
        stock: 50,
        featured: true,
      },
      {
        name: 'Samsung Odyssey G9',
        price: 1299,
        originalPrice: 1499,
        image: 'https://picsum.photos/id/2/300/200',
        description: '49" Curved QLED Monitor',
        category: categories[2]._id,
        stock: 15,
        featured: true,
      },
      {
        name: 'Corsair K100 RGB',
        price: 229,
        originalPrice: 249,
        image: 'https://picsum.photos/id/3/300/200',
        description: 'Optical-Mechanical Keyboard',
        category: categories[3]._id,
        stock: 25,
        featured: true,
      },
      {
        name: 'INNO3D RTX 5090',
        price: 2199,
        originalPrice: 2499,
        image: 'https://picsum.photos/id/8/300/200',
        description: 'Next-gen GPU with AI capabilities',
        category: categories[5]._id,
        stock: 8,
        featured: true,
      },
      {
        name: 'MSI MPG 321URX',
        price: 1099,
        originalPrice: 1299,
        image: 'https://picsum.photos/id/9/300/200',
        description: '4K 240Hz QD-OLED',
        category: categories[2]._id,
        stock: 20,
        featured: true,
      },
    ];

    await Product.insertMany(products);
    console.log('Data seeded successfully!');
    process.exit();
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
};

module.exports = seedProducts;