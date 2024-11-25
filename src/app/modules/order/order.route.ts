import express from 'express'
import { OrderController } from './order.controller'


const route = express.Router()
// crate product
route.post('/',OrderController.createOrder)
// get total revenue
route.get('/revenue',OrderController.getrevenueOrder)

export const OrderRoute=route