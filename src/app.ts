import express, { Express, Request, Response } from 'express'
import cors from 'cors'
import { ProductRoute } from './app/modules/product/product.route';

const app: Express = express();

//middleware
app.use(express.json())
app.use(cors())

// route
app.use('/',(req:Request,res:Response)=>{
    res.send("Hello world")

})
app.use('/api/products', ProductRoute)
export default app;

