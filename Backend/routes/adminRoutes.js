// routes/adminRoutes.js
import { Router } from 'express';
import adminMiddleware from '../middleware/adminMiddleware.js';
import { find } from '../models/Product.js';
import { find as _find } from '../models/Order.js';
import { find as __find } from '../models/User.js';

const router = Router();

// Admin Route to get all users
router.get('/users', adminMiddleware, async (req, res) => {
  try {
    const users = await __find({});
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

// Admin Route to get all orders
router.get('/orders', adminMiddleware, async (req, res) => {
  try {
    const orders = await _find({}).populate('user', 'id name email');
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

// Admin Route to get all products
router.get('/products', adminMiddleware, async (req, res) => {
  try {
    const products = await find({});
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

export default router;
