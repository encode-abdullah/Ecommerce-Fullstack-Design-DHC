const Product = require('../models/Product');
const Category = require('../models/Category');

const seedProducts = async () => {
  try {
    await Category.deleteMany();
    await Product.deleteMany();

    const categories = await Category.insertMany([
      { name: 'Electronics', slug: 'electronics', description: 'Gadgets, phones, and tech devices' },
      { name: 'Fashion', slug: 'fashion', description: 'Clothing, shoes, and accessories' },
      { name: 'Home & Kitchen', slug: 'home-kitchen', description: 'Furniture, appliances, and decor' },
      { name: 'Sports & Outdoors', slug: 'sports-outdoors', description: 'Fitness gear and outdoor equipment' },
      { name: 'Beauty & Health', slug: 'beauty-health', description: 'Skincare, makeup, and wellness' },
      { name: 'Toys & Games', slug: 'toys-games', description: 'Kids toys and board games' },
      { name: 'Books & Stationery', slug: 'books-stationery', description: 'Books, notebooks, and office supplies' },
      { name: 'Automotive', slug: 'automotive', description: 'Car parts, accessories, and tools' },
      { name: 'Pet Supplies', slug: 'pet-supplies', description: 'Food, toys, and accessories for pets' },
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
        name: 'Nike Air Max 270',
        price: 159,
        originalPrice: 199,
        image: 'https://picsum.photos/id/1/300/200',
        description: 'Comfortable running shoes for men',
        category: categories[1]._id,
        stock: 50,
        featured: true,
      },
      {
        name: 'Samsung Smart TV 55"',
        price: 1299,
        originalPrice: 1499,
        image: 'https://picsum.photos/id/2/300/200',
        description: '4K UHD Smart TV with voice control',
        category: categories[0]._id,
        stock: 15,
        featured: true,
      },
      {
        name: 'Yoga Mat Premium',
        price: 49,
        originalPrice: 69,
        image: 'https://picsum.photos/id/3/300/200',
        description: 'Non-slip exercise yoga mat, 6mm thick',
        category: categories[3]._id,
        stock: 100,
        featured: true,
      },
      {
        name: 'Vitamin C Serum',
        price: 29,
        originalPrice: 45,
        image: 'https://picsum.photos/id/8/300/200',
        description: 'Brightening face serum with hyaluronic acid',
        category: categories[4]._id,
        stock: 200,
        featured: true,
      },
      {
        name: 'LEGO City Fire Station',
        price: 89,
        originalPrice: 109,
        image: 'https://picsum.photos/id/9/300/200',
        description: 'Building toy set with minifigures',
        category: categories[5]._id,
        stock: 30,
        featured: true,
      },
      {
        name: 'Stainless Steel Water Bottle',
        price: 25,
        originalPrice: 35,
        image: 'https://picsum.photos/id/10/300/200',
        description: 'Insulated bottle, keeps drinks cold 24hrs',
        category: categories[3]._id,
        stock: 150,
        featured: false,
      },
      {
        name: 'Wireless Bluetooth Speaker',
        price: 79,
        originalPrice: 99,
        image: 'https://picsum.photos/id/11/300/200',
        description: 'Portable speaker with deep bass, IPX7 waterproof',
        category: categories[0]._id,
        stock: 40,
        featured: false,
      },
      {
        name: 'Denim Jacket Classic',
        price: 69,
        originalPrice: 89,
        image: 'https://picsum.photos/id/12/300/200',
        description: 'Vintage wash denim jacket for men',
        category: categories[1]._id,
        stock: 35,
        featured: false,
      },
      {
        name: 'Ceramic Coffee Mug Set',
        price: 34,
        originalPrice: 44,
        image: 'https://picsum.photos/id/13/300/200',
        description: 'Set of 4 colorful ceramic mugs, 350ml',
        category: categories[2]._id,
        stock: 60,
        featured: false,
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
