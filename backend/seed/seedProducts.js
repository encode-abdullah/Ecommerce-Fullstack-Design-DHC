const fs = require('fs');
const path = require('path');
const Product = require('../models/Product');
const Category = require('../models/Category');

const PRODUCTS_ROOT = path.join(__dirname, '..', '..', '..', 'Products');

function parseProductsTxt(filePath) {
  if (!fs.existsSync(filePath)) return [];
  const content = fs.readFileSync(filePath, 'utf-8');
  const products = [];
  const blocks = content.split(/\n\d+\.\s+/).slice(1);
  for (const block of blocks) {
    const lines = block.trim().split('\n');
    const name = lines[0].trim();
    const priceLine = lines.find(l => l.includes('Price:'));
    const noteLine = lines.find(l => l.includes('Note:'));
    const priceMatch = priceLine ? priceLine.match(/\$(\d+)/) : null;
    const price = priceMatch ? parseInt(priceMatch[1]) : 10;
    const desc = noteLine ? noteLine.replace('Note:', '').trim() : '';
    products.push({ name, price, desc });
  }
  return products;
}

function findProductImages(productFolder) {
  if (!fs.existsSync(productFolder)) return [];
  const files = fs.readdirSync(productFolder);
  return files
    .filter(f => /\.(jpg|jpeg|png|webp|gif)$/i.test(f))
    .sort((a, b) => {
      const numA = parseInt(a.match(/\d+/)?.[0] || '0');
      const numB = parseInt(b.match(/\d+/)?.[0] || '0');
      return numA - numB;
    })
    .map(f => `/products/${path.relative(PRODUCTS_ROOT, path.join(productFolder, f)).replace(/\\/g, '/')}`);
}

const seedProducts = async () => {
  try {
    await Product.deleteMany({});
    await Category.deleteMany({});

    console.log('Scanning Products folder...');
    const parentFolders = fs.readdirSync(PRODUCTS_ROOT, { withFileTypes: true })
      .filter(d => d.isDirectory())
      .map(d => d.name);

    console.log(`Found parent categories: ${parentFolders.join(', ')}`);

    for (const parentName of parentFolders) {
      const parentPath = path.join(PRODUCTS_ROOT, parentName);
      const parentCat = await Category.create({
        name: parentName,
        slug: parentName.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        description: `${parentName} products`,
      });
      console.log(`Created parent category: ${parentName}`);

      const subFolders = fs.readdirSync(parentPath, { withFileTypes: true })
        .filter(d => d.isDirectory())
        .map(d => d.name);

      for (const subName of subFolders) {
        const subPath = path.join(parentPath, subName);
        const subCat = await Category.create({
          name: subName,
          slug: subName.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
          description: '',
          parent: parentCat._id,
        });
        console.log(`  Created sub-category: ${subName}`);

        const productsTxtPath = path.join(subPath, 'products.txt');
        const productsData = parseProductsTxt(productsTxtPath);

        const productFolders = fs.readdirSync(subPath, { withFileTypes: true })
          .filter(d => d.isDirectory())
          .map(d => d.name);

        for (let i = 0; i < productFolders.length; i++) {
          const prodFolderName = productFolders[i];
          const prodFolderPath = path.join(subPath, prodFolderName);
          const images = findProductImages(prodFolderPath);

          const pData = productsData.find(p => prodFolderName.includes(p.name) || p.name.includes(prodFolderName.split(',')[0].trim()));
          const name = pData?.name || prodFolderName;
          const price = pData?.price || 10;
          const desc = pData?.desc || '';

          await Product.create({
            name,
            price,
            originalPrice: 0,
            image: images[0] || '',
            images,
            description: desc,
            category: subCat._id,
            stock: Math.floor(Math.random() * 96) + 5,
            featured: i < 2,
          });
        }
        console.log(`    Seeded ${productFolders.length} products in ${subName}`);
      }
    }

    console.log('All products seeded successfully!');
  } catch (error) {
    console.error('Error seeding data:', error);
  }
};

module.exports = seedProducts;
