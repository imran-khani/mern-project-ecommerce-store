import Order from '../models/Order';
import { Router } from 'express';


const router = Router();

// fetch all orders(admin)
router.get('/', async (req, res) => {
    try {
        const orders = await Order.find().populate('user products.product');
        res.json(orders)
    } catch (error) {
        res.status(500).json({ message: 'server error' })
    }
})

// fetch user order
router.get('/user/:userId', async (req, res) => {
    try {
        const { userId } = req.params.userId;
        const orders = await Order.findById(userId).populate('products.product');
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: 'server error' })
    }
})

// Place a new order
router.post('/', async (req, res) => {
    try {
        const { user, products, totalPrice } = req.body;
        const newOrder = new Order({
            user,
            products,
            totalPrice,
        });
        const savedOrders = await newOrder.save();
        res.status(201).json(savedOrders);

    } catch (error) {
        res.status(500).json({ message: 'server error' })
    }
})

// update order status (Admin)
router.put('/:id', async (req, res) => {
    try {
        const updatedOrder = await Order.findByIdAndUpdate(req.params.id, { new: true });
        if (!updatedOrder) return res.status(404).json({ message: 'order not found' });
        res.json(updatedOrder)
    } catch (error) {
        res.status(500).json({ message: 'server error' })
    }
})