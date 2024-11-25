import { Request, Response } from 'express';
import { ProductService } from './product.service';
import { mongooseErrorHandler } from '../../middleware/mongooseErrorHandler';

// create product function
const createProduct = async (req: Request, res: Response) => {
    try {
        const data = req.body
        const result = await ProductService.createProductDB(data)
        res.status(200).json({
            success: true,
            message: 'Bike created successfully',
            data: result,
        });
    } catch (err: any) {
        const error = mongooseErrorHandler(err)
        res.status(500).json(error)   
    }
};
// get all product function
const getallProduct = async (req: Request, res: Response) => {
    try {
        let filter = {};
        const { searchTerm } = req.query
        if (searchTerm) {
            filter = {
                $or: [
                    { name: { $regex: searchTerm, $options: 'i' } },
                    { brand: { $regex: searchTerm, $options: 'i' } },
                    { category: { $regex: searchTerm, $options: 'i' } },
                ],
            };
        }
        const result = await ProductService.getallProductDB(filter)
        res.status(200).json({
            success: true,
            message: 'Bikes retrieved successfully',
            data: result,
        });
    } catch (err: any) {
        const error = mongooseErrorHandler(err)
        res.status(500).json(error)   
    }
};
// get single product function
const getsingleProduct = async (req: Request, res: Response) => {
    try {
        const { productId } = req.params;
        const result = await ProductService.getsingleProductDB(productId as string)
        res.status(200).json({
            success: true,
            message: 'Bike retrieved successfully',
            data: result
        });
    } catch (err: any) {
        const error = mongooseErrorHandler(err)
        res.status(500).json(error)   
    }
};
// update product function
const updateProduct = async (req: Request, res: Response) => {
    try {
        const { productId } = req.params;
        const updateData = req.body;
        const result = await ProductService.updateProductDB(updateData, productId)
        res.status(200).json({
            success: true,
            message: 'Bike retrieved successfully',
            data: result
        });
    } catch (err: any) {
        const error = mongooseErrorHandler(err)
        res.status(500).json(error)   
    }
};
// delete prodct funtion
const deleteProduct = async (req: Request, res: Response) => {
    try {
        const { productId } = req.params;
        const result = await ProductService.deleteProductDB(productId as string)
        res.status(200).json({
            success: true,
            message: 'Bike deleted  successfully',
            data: result
        });
    } catch (err: any) {
        const error = mongooseErrorHandler(err)
        res.status(500).json(error)   
    }
};
export const ProductController = { createProduct, getallProduct, getsingleProduct, deleteProduct, updateProduct }