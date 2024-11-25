import express, { Express, Request, Response } from 'express'
import cors from 'cors'
import { ProductRoute } from './app/modules/product/product.route';
import { OrderRoute } from './app/modules/order/order.route';

const app: Express = express();

//middleware 
app.use(express.json())
app.use(cors())

// route
app.get('/',(req:Request,res:Response)=>{
    res.send("Hello world")

})
// product handel all route
app.use('/api/products', ProductRoute)
// order handel all route
app.use('/api/orders', OrderRoute)

export default app;

