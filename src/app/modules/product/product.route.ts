import express from 'express'
import { ProductController } from './product.controller'

const route = express.Router()
// post create product
route.post('/', ProductController.createProduct)
// get all product and search qurey handel
route.get('/', ProductController.getallProduct)
// single product get
route.get('/:productId', ProductController.getsingleProduct)
// update product
route.put('/:productId', ProductController.updateProduct)
// delete poruct 
route.delete('/:productId', ProductController.deleteProduct)

export const ProductRoute = route