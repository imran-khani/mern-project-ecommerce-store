import Product from '../models/Product'
import { Router } from 'express'


const router = Router();

// Fetch all products
router.get('/', async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products)
    } catch (error) {
        res.status(500).json({ message: 'Server error' })
    }
})

// fetch by id
router.get('/:id',async (req,res)=>{
    try {
        const {id} = req.params
        const product = await Product.findById(id);
        if (!product) return res.status(404).json({message:'Proudct not found.'})
            res.json(product); 
        
    } catch (error) {
        res.status(500).json({message:'Server error'})
    }
})

// add new product

router.post('/',async(req,res)=>{
    try {
        const {name,description,price,category,stock,imageUrl} = req.body;

        const newProduct = new Product({
            name,
            description,
            price,
            category,
            stock,
            imageUrl,
        });
        const savedProduct = await newProduct.save();
        res.status(201).json(savedProduct);

    } catch (error) {
        res.status(500).json({message:'server error'})
    }
})

// Update a product by ID
router.put('/:id',async (req,res)=>{
    try {
        const updatedProduct = await Product.findByIdAndUpdate(req.params.id,req.body, {new:true});
        if (!updatedProduct) return res.status(404).json({ message: 'Product not found' });
        res.json(updatedProduct)
        
    } catch (error) {
        res.status(500).json({message:'server error'})
    }
})

// Delete a product by ID
router.delete('/:id', async (req, res) => {
    try {
      const deletedProduct = await Product.findByIdAndDelete(req.params.id);
      if (!deletedProduct) return res.status(404).json({ message: 'Product not found' });
      res.json({ message: 'Product deleted successfully' });
    } catch (err) {
      res.status(500).json({ message: 'Server Error' });
    }
  });

  export default router