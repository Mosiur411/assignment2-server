import { Schema, model } from 'mongoose';
import { TProduct } from './product.interface';
const productSchema = new Schema<TProduct>({
    name: {
        type: String,
        trim: true,
        required: [true, 'Product name is required'],
        minlength: [2, 'Product name must be at least 2 characters long'],
        maxlength: [50, 'Product name cannot exceed 50 characters'],
    },
    brand: {
        type: String,
        trim: true,
        required: [true, 'Brand name is required'],
    },
    price: {
        type: Number,
        required: [true, 'Price is required'],
        min: [0, 'Price must be at least 0']
    },
    quantity: {
        type: Number,
        required: [true, 'Quantity is required'],
        min: [0, 'Quantity cannot be negative'],
    },
    category: {
        type: String,
        trim: true,
        enum: {
            values: ['Mountain', 'Road', 'Hybrid', 'Electric'],
            message: '{VALUE} is not a valid category',
        },
        required: [true, 'Category is required'],
    },
    description: {
        type: String,
        trim: true,
        required: [true, 'Description is required'],
        minlength: [10, 'Description must be at least 10 characters long'],
    },
    inStock: {
        type: Boolean,
        trim: true,
        required: [true, 'In-stock status is required'],
    },
    isDeleted: {
        type: Boolean,
        trim: true,
        default: false,
    },
}, { timestamps: true });

productSchema.pre('save', function (next) {
    if (this.quantity === 0) {
        this.inStock = false;
    } else {
        this.inStock = true;
    }
    next();
});

productSchema.pre('find', function (next) {
    this.find({ isDeleted: { $ne: true } });
    next();
});
productSchema.pre('findOne', function (next) {
    this.find({ isDeleted: { $ne: true } });
    next();
});



export const Product = model<TProduct>('Product', productSchema);
