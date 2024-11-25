import { Request, Response } from 'express';
import { OrderService } from './order.service';
// create order funtion
const createOrder = async (req: Request, res: Response) => {
    try {
        const data = req.body
        const result = await OrderService.createOrderDB(data)

        res.status(200).json({
            success: true,
            message: 'Order created successfully',
            data: result,
        });
    } catch (err: any) {
        console.log(err)
        res.status(500).json({
            success: false,
            message: err.message || 'something went wrong',
            error: err,
        });
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
        res.status(500).json({
            success: false,
            message: err.message || 'something went wrong',
            error: err,
        });
    }
};
export const OrderController = { createOrder, getrevenueOrder }