import { Request, Response } from 'express';
import { ProductService } from './product.service';

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
        res.status(500).json({
            success: false,
            message: err.message || 'something went wrong',
            error: err,
        });
    }
};
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
        res.status(500).json({
            success: false,
            message: err.message || 'something went wrong',
            error: err,
        });
    }
};
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
        res.status(500).json({
            success: false,
            message: err.message || 'something went wrong',
            error: err,
        });
    }
};
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
        res.status(500).json({
            success: false,
            message: err.message || 'something went wrong',
            error: err,
        });
    }
};
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
        res.status(500).json({
            success: false,
            message: err.message || 'something went wrong',
            error: err,
        });
    }
};
export const ProductController = { createProduct, getallProduct, getsingleProduct, deleteProduct, updateProduct }