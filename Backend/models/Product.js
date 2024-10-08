import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    image: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    countInStock: {
        type: Number,
        required: true,
        default: 0,
        min: 0
    }
}, {timestamps:true});

const Product = mongoose.model('Product', productSchema);
export default Product;
