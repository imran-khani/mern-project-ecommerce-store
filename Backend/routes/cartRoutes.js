import express from 'express';
import Cart from '../models/Cart.js';
import { body, validationResult } from 'express-validator';

const router = express.Router();

// Add item to cart
router.post(
    '/',
    [
        body('productId').isMongoId(),
        body('quantity').isInt({ min: 1 })
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        try {
            const { productId, quantity } = req.body;
            const userId = req.user.id;  // Assuming user authentication is implemented

            let cart = await Cart.findOne({ user: userId });

            if (!cart) {
                cart = new Cart({ user: userId, items: [] });
            }

            await cart.addItem(productId, quantity);

            res.status(200).json(cart);
        } catch (error) {
            console.error('Error in cart route:', error);
            res.status(500).json({ message: 'Server error' });
        }
    }
);

// Remove item from cart
router.delete(
    '/',
    [
        body('productId').isMongoId()
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        try {
            const { productId } = req.body;
            const userId = req.user.id;  // Assuming user authentication is implemented

            let cart = await Cart.findOne({ user: userId });

            if (!cart) {
                return res.status(404).json({ message: 'Cart not found' });
            }

            await cart.removeItem(productId);

            res.status(200).json(cart);
        } catch (error) {
            console.error('Error in cart route:', error);
            res.status(500).json({ message: 'Server error' });
        }
    }
);

export default router;
