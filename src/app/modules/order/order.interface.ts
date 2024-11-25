import mongoose from 'mongoose'
// order type
export type TOrder = {
    email: string,
    product : mongoose.Schema.Types.ObjectId,
    quantity: number,
    totalPrice : number,
}