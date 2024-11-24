import express from 'express'
import { ProductController } from './product.controller'

const route = express.Router()

route.post('/', ProductController.createProduct)
route.get('/', ProductController.getallProduct)
route.get('/:productId', ProductController.getsingleProduct)
route.put('/:productId', ProductController.updateProduct)
route.delete('/:productId', ProductController.deleteProduct)
export const ProductRoute = route