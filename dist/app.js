"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const product_route_1 = require("./app/modules/product/product.route");
const order_route_1 = require("./app/modules/order/order.route");
const app = (0, express_1.default)();
//middleware 
app.use(express_1.default.json());
app.use((0, cors_1.default)());
// route
app.get('/', (req, res) => {
    res.send("Hello world");
});
// product handel all route
app.use('/api/products', product_route_1.ProductRoute);
// order handel all route
app.use('/api/orders', order_route_1.OrderRoute);
exports.default = app;
