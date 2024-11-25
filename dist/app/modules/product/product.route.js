"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductRoute = void 0;
const express_1 = __importDefault(require("express"));
const product_controller_1 = require("./product.controller");
const route = express_1.default.Router();
// post create product
route.post('/', product_controller_1.ProductController.createProduct);
// get all product and search qurey handel
route.get('/', product_controller_1.ProductController.getallProduct);
// single product get
route.get('/:productId', product_controller_1.ProductController.getsingleProduct);
// update product
route.put('/:productId', product_controller_1.ProductController.updateProduct);
// delete poruct 
route.delete('/:productId', product_controller_1.ProductController.deleteProduct);
exports.ProductRoute = route;
