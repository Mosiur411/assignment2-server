import { TProduct, TProductUpdate, TProductQuery } from "./product.interface";
import { Product } from "./product.model";



const createProductDB = async (productData: TProduct) => {
    const result = (await Product.create(productData));
    return result;
};
const getallProductDB = async (productData: TProductQuery) => {
    const result = await Product.find(productData);
    return result;
};
const getsingleProductDB = async (productId: string) => {
    const result = await Product.findOne({ _id: productId });
    return result;
};
const updateProductDB = async (updateData: TProductUpdate, productId: string) => {
    const result = await Product.findByIdAndUpdate({ _id: productId }, updateData);
    return result;
};
const deleteProductDB = async (productId: string) => {
    const result = await Product.updateOne({ _id: productId }, { isDeleted: true });
    return result;
};


export const ProductService = { createProductDB, getallProductDB, getsingleProductDB, updateProductDB, deleteProductDB }