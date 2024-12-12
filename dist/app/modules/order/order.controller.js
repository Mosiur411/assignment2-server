"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderController = void 0;
const order_service_1 = require("./order.service");
const mongooseErrorHandler_1 = require("../../middleware/mongooseErrorHandler");
// create order funtion
const createOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = req.body;
        const result = yield order_service_1.OrderService.createOrderDB(data);
        // handel error
        if (result == false) {
            // not work
            //const err = new Error('Product not available or insufficient stock.');
            res.status(500).json({
                success: false,
                message: 'Product not available or insufficient stock.',
                error: data,
            });
        }
        else {
            res.status(200).json({
                success: true,
                message: 'Order created successfully',
                data: result,
            });
        }
    }
    catch (err) {
        console.log(err);
        const error = (0, mongooseErrorHandler_1.mongooseErrorHandler)(err);
        res.status(500).json(error);
    }
});
// get revenue 
const getrevenueOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield order_service_1.OrderService.getrevenueOrderDB();
        res.status(200).json({
            success: true,
            message: 'Revenue calculated successfully',
            data: result,
        });
    }
    catch (err) {
        const error = (0, mongooseErrorHandler_1.mongooseErrorHandler)(err);
        res.status(500).json(error);
    }
});
exports.OrderController = { createOrder, getrevenueOrder };
