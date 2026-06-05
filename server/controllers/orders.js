import Order from '../models/Order.js';
import CartItem from '../models/CartItem.js';

export const createOrder = async (req, res) => {
  try {
    const cartItems = await CartItem.find({ user: req.user.id }).populate('product');
    
    if (cartItems.length === 0) {
      return res.status(400).json({ message: 'No items in cart' });
    }
    
    const orderItems = cartItems.map(item => ({
      product: item.product._id,
      name: item.product.name,
      quantity: item.quantity,
      price: item.product.price,
      image: item.product.images[0]
    }));
    
    const itemsPrice = orderItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    
    const order = await Order.create({
      user: req.user.id,
      orderItems,
      shippingAddress: req.body.shippingAddress,
      paymentMethod: req.body.paymentMethod,
      itemsPrice,
      shippingPrice: itemsPrice > 200 ? 0 : 20,
      totalPrice: itemsPrice + (itemsPrice > 200 ? 0 : 20)
    });
    
    await CartItem.deleteMany({ user: req.user.id });
    
    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate('user', 'name email');
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find({}).populate('user', 'id name');
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};