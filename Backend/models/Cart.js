import mongoose from 'mongoose';

const CartItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    min: 1
  }
});

const CartSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  items: [CartItemSchema]
}, { timestamps: true });

// Add methods for manipulating cart items
CartSchema.methods.addItem = function(productId, quantity) {
    const existingItemIndex = this.items.findIndex(item => item.product.toString() === productId);
    if (existingItemIndex !== -1) {
      this.items[existingItemIndex].quantity += quantity;
    } else {
      this.items.push({ product: productId, quantity });
    }
    return this.save();
};

CartSchema.methods.removeItem = function(productId) {
    this.items = this.items.filter(item => item.product.toString() !== productId);
    return this.save();
};

const Cart = mongoose.model('Cart', CartSchema);
export default Cart;
