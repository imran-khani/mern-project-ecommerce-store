import Product from '../models/Product.js';
import { Router } from 'express';
import { body, validationResult } from 'express-validator';

const router = Router();

// Fetch all products
router.get('/', async (req, res, next) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        next(error);
    }
});

// Fetch product by ID
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id);
        if (!product) return res.status(404).json({ message: 'Product not found' });
        res.json(product);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Add new product
router.post(
    '/',
    [
        body('name').isString().notEmpty(),
        body('description').isString().notEmpty(),
        body('price').isFloat({ min: 0 }),
        body('category').isString().notEmpty(),
        body('countInStock').isInt({ min: 0 }),
        body('image').isString().notEmpty()
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        try {
            const { name, description, price, category, countInStock, image } = req.body;
            const newProduct = new Product({
                name,
                description,
                price,
                category,
                countInStock,
                image
            });
            const savedProduct = await newProduct.save();
            res.status(201).json(savedProduct);
        } catch (error) {
            res.status(500).json({ message: 'Server error' });
        }
    }
);

// Update a product by ID
router.put(
    '/:id',
    [
        body('name').optional().isString().notEmpty(),
        body('description').optional().isString().notEmpty(),
        body('price').optional().isFloat({ min: 0 }),
        body('category').optional().isString().notEmpty(),
        body('countInStock').optional().isInt({ min: 0 }),
        body('image').optional().isString().notEmpty()
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        try {
            const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
            if (!updatedProduct) return res.status(404).json({ message: 'Product not found' });
            res.json(updatedProduct);
        } catch (error) {
            res.status(500).json({ message: 'Server error' });
        }
    }
);

// Delete a product by ID
router.delete('/:id', async (req, res) => {
    try {
        const deletedProduct = await Product.findByIdAndDelete(req.params.id);
        if (!deletedProduct) return res.status(404).json({ message: 'Product not found' });
        res.json({ message: 'Product deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

export default router;
