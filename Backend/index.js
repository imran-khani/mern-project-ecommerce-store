import express from "express";
import cors from 'cors';
import mongoose from "mongoose";
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes.js'; // Added .js extension
import productRoutes from './routes/productRoutes.js'; // Added .js extension
import orderRoutes from './routes/orderRoutes.js'; // Added .js extension

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URL)
.then(() => console.log('MongoDB connected successfully'))
.catch((error) => console.error('Error connecting to MongoDB:', error.message));

const PORT = process.env.PORT || 5000;

app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
