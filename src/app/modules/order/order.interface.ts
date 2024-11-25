import mongoose from 'mongoose'
export type TOrder = {
    email: string,
    product : mongoose.Schema.Types.ObjectId,
    quantity: number,
    totalPrice : number,
}