"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductRoute = void 0;
const express_1 = __importDefault(require("express"));
const product_controller_1 = require("./product.controller");
const route = express_1.default.Router();
route.post('/', product_controller_1.ProductController.createProduct);
route.get('/', product_controller_1.ProductController.getallProduct);
route.get('/:productId', product_controller_1.ProductController.getsingleProduct);
route.put('/:productId', product_controller_1.ProductController.updateProduct);
route.delete('/:productId', product_controller_1.ProductController.deleteProduct);
exports.ProductRoute = route;
