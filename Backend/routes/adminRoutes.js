import { Router } from 'express';
import adminMiddleware from '../middleware/adminMiddleware.js';
import Order from '../models/Order.js';
import User from '../models/User.js';
import Product from '../models/Product.js';

const router = Router();

// Admin Route to get all users
router.get('/users', adminMiddleware, async (req, res) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Admin Route to get all orders
router.get('/orders', adminMiddleware, async (req, res) => {
  try {
    const orders = await Order.find({})
      .populate('user', 'id name email')
      .populate('products.product', 'name price');
    res.json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Admin Route to get all products
router.get('/products', adminMiddleware, async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Admin Route to update a user (example route)
router.put('/users/:id', adminMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, isAdmin } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      id,
      { name, email, isAdmin },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(updatedUser);
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Admin Route to delete a product (example route)
router.delete('/products/:id', adminMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Admin Route to update product details (example route)
router.put('/products/:id', adminMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const { name, price, description, stock } = req.body;

    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      { name, price, description, stock },
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json(updatedProduct);
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ message: 'Server Error' });
  }
});

export default router;
