import CartItem from '../models/CartItem.js';
import Product from '../models/Product.js';

export const getCart = async (req, res) => {
  try {
    const cartItems = await CartItem.find({ user: req.user.id })
      .populate('product');
    res.json(cartItems);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const addToCart = async (req, res) => {
  const { productId, quantity } = req.body;
  
  try {
    const existingItem = await CartItem.findOne({ 
      user: req.user.id, 
      product: productId 
    });
    
    if (existingItem) {
      existingItem.quantity += quantity;
      await existingItem.save();
      return res.json(existingItem);
    }
    
    const cartItem = await CartItem.create({
      user: req.user.id,
      product: productId,
      quantity
    });
    
    res.status(201).json(cartItem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateCartItem = async (req, res) => {
  try {
    const cartItem = await CartItem.findOne({ 
      user: req.user.id, 
      _id: req.params.id 
    });
    
    if (!cartItem) {
      return res.status(404).json({ message: 'Cart item not found' });
    }
    
    cartItem.quantity = req.body.quantity;
    await cartItem.save();
    res.json(cartItem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const removeFromCart = async (req, res) => {
  try {
    await CartItem.findOneAndDelete({ 
      user: req.user.id, 
      _id: req.params.id 
    });
    res.json({ message: 'Item removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const clearCart = async (req, res) => {
  try {
    await CartItem.deleteMany({ user: req.user.id });
    res.json({ message: 'Cart cleared' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};