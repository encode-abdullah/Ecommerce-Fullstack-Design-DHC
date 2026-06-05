import mongoose from 'mongoose'
import dotenv from 'dotenv'
import Product from './models/Product.js'

dotenv.config()

const products = [
  {
    name: 'Razer DeathAdder V3',
    description: 'Ultra-lightweight gaming mouse with Focus+ optical sensor',
    price: 89.99,
    category: 'mouse',
    brand: 'Razer',
    images: ['https://placehold.co/600x400/0f172a/06b6d4?text=Razer+Mouse'],
    specs: {
      'Sensor': 'Focus+ Optical',
      'DPI': '26000',
      'Buttons': '6',
      'Weight': '67g'
    },
    stock: 50,
    rating: 4.5,
    numReviews: 128,
    isFeatured: true
  },
  {
    name: 'Logitech G502 X',
    description: 'HERO 25K sensor gaming mouse with adjustable weights',
    price: 79.99,
    category: 'mouse',
    brand: 'Logitech',
    specs: {
      'Sensor': 'HERO 25K',
      'DPI': '25600',
      'Buttons': '11',
      'Weight': '121g'
    },
    stock: 35,
    rating: 4.3,
    numReviews: 95,
    isFeatured: true
  },
  {
    name: 'Corsair K70 RGB',
    description: 'Mechanical gaming keyboard with Cherry MX switches',
    price: 159.99,
    category: 'keyboard',
    brand: 'Corsair',
    specs: {
      'Switches': 'Cherry MX Red',
      'Layout': '100%',
      'Backlight': 'RGB',
      'Connectivity': 'Wired'
    },
    stock: 40,
    rating: 4.7,
    numReviews: 203,
    isFeatured: true
  },
  {
    name: 'SteelSeries Apex Pro',
    description: 'Adjustable mechanical switches gaming keyboard',
    price: 199.99,
    category: 'keyboard',
    brand: 'SteelSeries',
    specs: {
      'Switches': 'OmniPoint',
      'Layout': '100%',
      'Backlight': 'RGB',
      'Connectivity': 'Wired'
    },
    stock: 25,
    rating: 4.6,
    numReviews: 167,
    isFeatured: true
  },
  {
    name: 'HyperX Cloud II',
    description: '7.1 surround sound gaming headset',
    price: 99.99,
    category: 'headset',
    brand: 'HyperX',
    specs: {
      'Drivers': '53mm',
      'Frequency': '15Hz-25kHz',
      'Microphone': 'Detachable',
      'Wireless': 'No'
    },
    stock: 60,
    rating: 4.4,
    numReviews: 342,
    isFeatured: true
  },
  {
    name: 'Sony Pulse 3D',
    description: 'Wireless headset designed for PlayStation 5',
    price: 129.99,
    category: 'headset',
    brand: 'Sony',
    specs: {
      'Drivers': '40mm',
      'Frequency': '20Hz-20kHz',
      'Microphone': 'Built-in',
      'Wireless': 'Yes'
    },
    stock: 45,
    rating: 4.2,
    numReviews: 189,
    isFeatured: false
  },
  {
    name: 'Xbox Elite Controller',
    description: 'Premium customizable controller for Xbox and PC',
    price: 179.99,
    category: 'controller',
    brand: 'Microsoft',
    specs: {
      'Compatibility': 'Xbox, PC',
      'Battery': '40 hours',
      'Buttons': '18',
      'Custom Profiles': '3'
    },
    stock: 30,
    rating: 4.5,
    numReviews: 256,
    isFeatured: true
  },
  {
    name: 'Steam Deck',
    description: 'Portable gaming computer with custom AMD chip',
    price: 399.99,
    category: 'controller',
    brand: 'Valve',
    specs: {
      'CPU': 'AMD APU',
      'GPU': 'RDNA 2',
      'RAM': '16GB',
      'Storage': '64GB eMMC'
    },
    stock: 15,
    rating: 4.8,
    numReviews: 512,
    isFeatured: true
  },
  {
    name: 'Secretlab Titan Evo 2022',
    description: 'Premium ergonomic gaming chair with 4D armrests',
    price: 599.99,
    category: 'chair',
    brand: 'Secretlab',
    specs: {
      'Material': 'NEVERVE',
      'Weight Limit': '150kg',
      'Adjustments': '4D Armrests',
      'Lumbar': 'Adjustable'
    },
    stock: 20,
    rating: 4.9,
    numReviews: 428,
    isFeatured: true
  },
  {
    name: 'Razer BlackShark V2',
    description: '1440p 240Hz gaming monitor with IPS panel',
    price: 349.99,
    category: 'monitor',
    brand: 'Razer',
    specs: {
      'Size': '27"',
      'Resolution': '1440p',
      'Refresh': '240Hz',
      'Panel': 'IPS'
    },
    stock: 28,
    rating: 4.6,
    numReviews: 178,
    isFeatured: true
  },
  {
    name: 'ASUS ROG Swift',
    description: '32" 4K 144Hz gaming monitor with HDR',
    price: 799.99,
    category: 'monitor',
    brand: 'ASUS',
    specs: {
      'Size': '32"',
      'Resolution': '4K UHD',
      'Refresh': '144Hz',
      'Panel': 'IPS'
    },
    stock: 12,
    rating: 4.7,
    numReviews: 89,
    isFeatured: false
  }
]

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/gaming-gear-store')
  .then(async () => {
    await Product.deleteMany()
    await Product.insertMany(products)
    console.log('Products seeded successfully')
    process.exit()
  })
  .catch(err => {
    console.error(err)
    process.exit(1)
  })