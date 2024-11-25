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
exports.OrderService = void 0;
const product_model_1 = require("../product/product.model");
const order_model_1 = require("./order.model");
// product chack 
const productquantityHandel = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const getProduct = yield product_model_1.Product.findOne({ _id: data === null || data === void 0 ? void 0 : data.product, inStock: true, quantity: { $gte: data === null || data === void 0 ? void 0 : data.quantity } });
    return getProduct;
});
// order create funtion
const createOrderDB = (orderData) => __awaiter(void 0, void 0, void 0, function* () {
    // check product then order
    const productInfo = yield productquantityHandel(orderData);
    if (productInfo) {
        const saveOrder = yield order_model_1.Order.create(orderData);
        const newQuantity = productInfo.quantity - orderData.quantity;
        yield product_model_1.Product.findByIdAndUpdate(productInfo._id, {
            $inc: { quantity: -orderData.quantity },
            inStock: newQuantity > 0,
        }, { new: true });
        return saveOrder;
    }
});
// order get total revenu
const getrevenueOrderDB = () => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const revenueData = yield order_model_1.Order.aggregate([
        {
            $group: {
                _id: null,
                totalRevenue: { $sum: '$totalPrice' },
            },
        },
    ]);
    const formatResult = {
        totalRevenue: (_a = revenueData[0]) === null || _a === void 0 ? void 0 : _a.totalRevenue
    };
    return formatResult;
});
exports.OrderService = { createOrderDB, getrevenueOrderDB };
