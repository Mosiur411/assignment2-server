import { Product } from "../product/product.model";
import { TOrder } from "./order.interface";
import { Order } from "./order.model";

// product chack 
const productquantityHandel = async (data: any) => {
    const getProduct = await Product.findOne({ _id: data?.product, inStock: true, quantity: { $gte: data?.quantity } })
    return getProduct;
}
// order create funtion
const createOrderDB = async (orderData: TOrder) => {
    // check product then order
    const productInfo = await productquantityHandel(orderData)
    if (productInfo) {
        const saveOrder = await Order.create(orderData)
        const newQuantity = productInfo.quantity - orderData.quantity;
        await Product.findByIdAndUpdate(
            productInfo._id,
            {
                $inc: { quantity: -orderData.quantity },
                inStock: newQuantity > 0,
            },
            { new: true }
        );
        return saveOrder;
    }
};
// order get total revenu
const getrevenueOrderDB = async () => {
    const revenueData = await Order.aggregate([
        {
            $group: {
                _id: null,
                totalRevenue: { $sum: '$totalPrice' },
            },
        },
    ]);
    const formatResult = {
        totalRevenue:revenueData[0]?.totalRevenue
    }
    return formatResult;
};

export const OrderService = { createOrderDB, getrevenueOrderDB }