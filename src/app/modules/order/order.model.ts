import mongoose, { Schema, model } from 'mongoose';
import { TOrder } from './order.interface';
// order schena and validation hanel
const orderSchema = new Schema<TOrder>({
    email: {
        type: String,
        required: [true, 'Customer email is required.'],
        trim: true,
        match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Please provide a valid email address.'],
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product', 
        required: [true, 'Product ID is required.'],
    },
    quantity: {
        type: Number,
        required: [true, 'Quantity is required.'],
        min: [1, 'Quantity must be at least 1.'],
    },
    totalPrice: {
        type: Number,
        required: [true, 'Total price is required.'],
        min: [0, 'Total price must be a positive value.'],
    },

}, { timestamps: true });





export const Order = model<TOrder>('Order', orderSchema);
