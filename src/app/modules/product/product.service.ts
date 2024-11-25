import { TProduct, TProductUpdate, TProductQuery } from "./product.interface";
import { Product } from "./product.model";



const createProductDB = async (productData: TProduct) => {
    // create product and retun create product result
    const result = await Product.create(productData);
    return result;
};
const getallProductDB = async (productData: TProductQuery) => {
    // get all product and result return 
    const result = await Product.find(productData);
    return result;
};
const getsingleProductDB = async (productId: string) => {
    // get single product 
    const result = await Product.findOne({ _id: productId });
    return result;
};
const updateProductDB = async (updateData: TProductUpdate, productId: string) => {
    // product update 
    const result = await Product.findByIdAndUpdate({ _id: productId }, updateData);
    return result;
};
const deleteProductDB = async (productId: string) => {
    // delete product just product status changes
    const result = await Product.updateOne({ _id: productId }, { isDeleted: true });
    return result;
};


export const ProductService = { createProductDB, getallProductDB, getsingleProductDB, updateProductDB, deleteProductDB }