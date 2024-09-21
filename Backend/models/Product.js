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
    },
    category: {
        type: String,
        required: true,
    },
    stock: {
        type: String,
        required: true,
        default: 0,
    },
    imageUrl: { type: String, required: true }
},{timestamps:true})

export default Product = mongoose.model('Product', productSchema)