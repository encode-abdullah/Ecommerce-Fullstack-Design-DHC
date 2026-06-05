const mockProducts = [
  { _id: '1', name: 'Razer DeathAdder V3', price: 89.99, category: 'mouse', brand: 'Razer', rating: 4.5, numReviews: 128, stock: 50, description: 'Ultra-lightweight gaming mouse with Focus+ optical sensor', images: ['https://placehold.co/600x400/06b6d4/0f172a?text=Razer+Mouse'], specs: { Sensor: 'Focus+ Optical', DPI: '26000', Weight: '67g' }, isFeatured: true },
  { _id: '2', name: 'Logitech G502 X', price: 79.99, category: 'mouse', brand: 'Logitech', rating: 4.3, numReviews: 95, stock: 35, description: 'HERO 25K sensor gaming mouse with adjustable weights', images: ['https://placehold.co/600x400/06b6d4/0f172a?text=Logitech+Mouse'], specs: { Sensor: 'HERO 25K', DPI: '25600', Weight: '121g' } },
  { _id: '3', name: 'Corsair K70 RGB', price: 159.99, category: 'keyboard', brand: 'Corsair', rating: 4.7, numReviews: 203, stock: 40, description: 'Mechanical gaming keyboard with Cherry MX switches', images: ['https://placehold.co/600x400/8b5cf6/0f172a?text=Corsair+Keyboard'], specs: { Switches: 'Cherry MX Red', Layout: '100%', Backlight: 'RGB' }, isFeatured: true },
  { _id: '4', name: 'SteelSeries Apex Pro', price: 199.99, category: 'keyboard', brand: 'SteelSeries', rating: 4.6, numReviews: 167, stock: 25, description: 'Adjustable mechanical switches gaming keyboard', images: ['https://placehold.co/600x400/8b5cf6/0f172a?text=SteelSeries+KB'], specs: { Switches: 'OmniPoint', Layout: '100%' } },
  { _id: '5', name: 'HyperX Cloud II', price: 99.99, category: 'headset', brand: 'HyperX', rating: 4.4, numReviews: 342, stock: 60, description: '7.1 surround sound gaming headset', images: ['https://placehold.co/600x400/06b6d4/0f172a?text=HyperX+Headset'], specs: { Drivers: '53mm', Frequency: '15Hz-25kHz' }, isFeatured: true },
  { _id: '6', name: 'Sony Pulse 3D', price: 129.99, category: 'headset', brand: 'Sony', rating: 4.2, numReviews: 189, stock: 45, description: 'Wireless headset designed for PlayStation 5', images: ['https://placehold.co/600x400/8b5cf6/0f172a?text=Sony+Headset'], specs: { Drivers: '40mm', Wireless: 'Yes' } },
  { _id: '7', name: 'Xbox Elite Controller', price: 179.99, category: 'controller', brand: 'Microsoft', rating: 4.5, numReviews: 256, stock: 30, description: 'Premium customizable controller for Xbox and PC', images: ['https://placehold.co/600x400/06b6d4/0f172a?text=Xbox+Controller'], specs: { Compatibility: 'Xbox, PC', Battery: '40 hours' }, isFeatured: true },
  { _id: '8', name: 'Steam Deck', price: 399.99, category: 'controller', brand: 'Valve', rating: 4.8, numReviews: 512, stock: 15, description: 'Portable gaming computer with custom AMD chip', images: ['https://placehold.co/600x400/8b5cf6/0f172a?text=Steam+Deck'], specs: { CPU: 'AMD APU', RAM: '16GB' }, isFeatured: true },
  { _id: '9', name: 'Secretlab Titan Evo 2022', price: 599.99, category: 'chair', brand: 'Secretlab', rating: 4.9, numReviews: 428, stock: 20, description: 'Premium ergonomic gaming chair with 4D armrests', images: ['https://placehold.co/600x400/06b6d4/0f172a?text=Gaming+Chair'], specs: { Material: 'NEVERVE', WeightLimit: '150kg' }, isFeatured: true },
  { _id: '10', name: 'ASUS ROG Swift', price: 799.99, category: 'monitor', brand: 'ASUS', rating: 4.7, numReviews: 89, stock: 12, description: '32" 4K 144Hz gaming monitor with HDR', images: ['https://placehold.co/600x400/8b5cf6/0f172a?text=ROG+Monitor'], specs: { Size: '32"', Resolution: '4K UHD', Refresh: '144Hz' } }
]

export const getProducts = (params = {}) => {
  let results = [...mockProducts]
  if (params.keyword) results = results.filter(p => p.name.toLowerCase().includes(params.keyword.toLowerCase()))
  if (params.category) results = results.filter(p => p.category === params.category)
  return Promise.resolve({ products: results, pages: 1, page: 1, count: results.length })
}

export const getProductById = (id) => {
  return Promise.resolve(mockProducts.find(p => p._id === id))
}

export const getTopProducts = () => {
  return Promise.resolve(mockProducts.filter(p => p.isFeatured))
}