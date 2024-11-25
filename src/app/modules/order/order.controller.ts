import { Request, Response } from 'express';
import { OrderService } from './order.service';
import { mongooseErrorHandler } from '../../middleware/mongooseErrorHandler';
// create order funtion
const createOrder = async (req: Request, res: Response) => {
    try {
        const data = req.body
        const result = await OrderService.createOrderDB(data)
        // handel error
        if (result == false) {
            // not work
            //const err = new Error('Product not available or insufficient stock.');
            res.status(500).json(
                {
                    success: false,
                    message: 'Product not available or insufficient stock.',
                    error: data,
                }
            )
        } else {
            res.status(200).json({
                success: true,
                message: 'Order created successfully',
                data: result,
            });
        }
    } catch (err: any) {
        console.log(err)
        const error = mongooseErrorHandler(err)
        res.status(500).json(error)
    }
};
// get revenue 
const getrevenueOrder = async (req: Request, res: Response) => {
    try {
        const result = await OrderService.getrevenueOrderDB()

        res.status(200).json({
            success: true,
            message: 'Revenue calculated successfully',
            data: result,
        });
    } catch (err: any) {
        const error = mongooseErrorHandler(err)
        res.status(500).json(error)
    }
};
export const OrderController = { createOrder, getrevenueOrder }