import Order from '../models/Order.js';
import { Router } from 'express';
import { body, validationResult } from 'express-validator';
import authMiddleware from '../middleware/authMiddleware.js';
import adminMiddleware from '../middleware/adminMiddleware.js';

const router = Router();

// Fetch all orders (admin)
router.get('/', async (req, res) => {
    try {
        // Add admin check here (if required)
        const orders = await Order.find().populate('user products.product');
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Fetch user orders
router.get('/user/:userId', async (req, res) => {
    try {
        const { userId } = req.params;
        const orders = await Order.find({ user: userId }).populate('products.product');
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Place a new order
router.post(
    '/',
    [
        body('user').isMongoId(),
        body('products').isArray({ min: 1 }),
        body('products.*.product').isMongoId(),
        body('products.*.quantity').isInt({ min: 1 }),
        body('totalPrice').isFloat({ min: 0 })
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        try {
            const { user, products, totalPrice } = req.body;
            const newOrder = new Order({
                user,
                products,
                totalPrice,
            });
            const savedOrder = await newOrder.save();
            res.status(201).json(savedOrder);
        } catch (error) {
            res.status(500).json({ message: 'Server error' });
        }
    }
);

// Update order status (admin)
router.put(
    '/:id',
    [
        body('orderStatus').isString().isIn(['Processing', 'Shipped', 'Delivered', 'Cancelled'])
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        try {
            const updatedOrder = await Order.findByIdAndUpdate(req.params.id, { orderStatus: req.body.orderStatus }, { new: true });
            if (!updatedOrder) return res.status(404).json({ message: 'Order not found' });
            res.json(updatedOrder);
        } catch (error) {
            res.status(500).json({ message: 'Server error' });
        }
    }
);

// POST create new order
router.post('/', authMiddleware, async (req, res) => {
    // ... existing code ...
});

// GET user's orders
router.get('/', authMiddleware, async (req, res) => {
    // ... existing code ...
});

// GET single order by ID
router.get('/:id', authMiddleware, async (req, res) => {
    // ... existing code ...
});

// PUT update order status (admin only)
router.put('/:id/status', authMiddleware, adminMiddleware, async (req, res) => {
    // ... existing code ...
});

export default router;
