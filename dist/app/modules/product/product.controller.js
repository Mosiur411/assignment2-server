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
exports.ProductController = void 0;
const product_service_1 = require("./product.service");
const mongooseErrorHandler_1 = require("../../middleware/mongooseErrorHandler");
// create product function
const createProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = req.body;
        const result = yield product_service_1.ProductService.createProductDB(data);
        res.status(200).json({
            success: true,
            message: 'Bike created successfully',
            data: result,
        });
    }
    catch (err) {
        const error = (0, mongooseErrorHandler_1.mongooseErrorHandler)(err);
        res.status(500).json(error);
    }
});
// get all product function
const getallProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let filter = {};
        const { searchTerm } = req.query;
        if (searchTerm) {
            filter = {
                $or: [
                    { name: { $regex: searchTerm, $options: 'i' } },
                    { brand: { $regex: searchTerm, $options: 'i' } },
                    { category: { $regex: searchTerm, $options: 'i' } },
                ],
            };
        }
        const result = yield product_service_1.ProductService.getallProductDB(filter);
        res.status(200).json({
            success: true,
            message: 'Bikes retrieved successfully',
            data: result,
        });
    }
    catch (err) {
        const error = (0, mongooseErrorHandler_1.mongooseErrorHandler)(err);
        res.status(500).json(error);
    }
});
// get single product function
const getsingleProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productId } = req.params;
        const result = yield product_service_1.ProductService.getsingleProductDB(productId);
        res.status(200).json({
            success: true,
            message: 'Bike retrieved successfully',
            data: result
        });
    }
    catch (err) {
        const error = (0, mongooseErrorHandler_1.mongooseErrorHandler)(err);
        res.status(500).json(error);
    }
});
// update product function
const updateProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productId } = req.params;
        const updateData = req.body;
        const result = yield product_service_1.ProductService.updateProductDB(updateData, productId);
        res.status(200).json({
            success: true,
            message: 'Bike retrieved successfully',
            data: result
        });
    }
    catch (err) {
        const error = (0, mongooseErrorHandler_1.mongooseErrorHandler)(err);
        res.status(500).json(error);
    }
});
// delete prodct funtion
const deleteProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productId } = req.params;
        const result = yield product_service_1.ProductService.deleteProductDB(productId);
        res.status(200).json({
            success: true,
            message: 'Bike deleted  successfully',
            data: result
        });
    }
    catch (err) {
        const error = (0, mongooseErrorHandler_1.mongooseErrorHandler)(err);
        res.status(500).json(error);
    }
});
exports.ProductController = { createProduct, getallProduct, getsingleProduct, deleteProduct, updateProduct };
