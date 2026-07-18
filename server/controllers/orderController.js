import Order from "../models/orderModel.js";
import User from "../models/userModel.js";
import Stripe from 'stripe';

const currency = 'USD';
const deliveryCharges = 10;

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const placeOrderByCOD = async(req, res) => {
    try {
        const { userId, items, amount, address } = req.body;
        const newOrder = new Order({ userId, items, amount, address, paymentMethod: "COD", payment: false, date: Date.now() });
        
        await newOrder.save();
        await User.findByIdAndUpdate(userId, { cartData: {} });
        return res.status(200).json({ success: true, message: "Order Placed!" });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ success: false, message: err.message });
    }
}

const placeOrderByStripe = async(req, res) => {
    try {
        const { userId, items, amount, address } = req.body;
        const { origin } = req.headers;

        const newOrder = new Order({ userId, items, amount, address, paymentMethod: "Stripe", payment: false, date: Date.now() });
        await newOrder.save();
        
        const line_items = items.map((item) => ({
            price_data: {
                currency: currency,
                product_data: {
                    name: item.name
                },
                unit_amount: item.price * 100,
            },
            quantity: item.quantity
        }));

        line_items.push({
            price_data: {
                currency: currency,
                product_data: {
                    name: "Delivery Charges"
                },
                unit_amount: deliveryCharges * 100,
            },
            quantity: 1
        });

        const session = await stripe.checkout.sessions.create({
            success_url: `${origin}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url: `${origin}/verify?success=false&orderId=${newOrder._id}`,
            line_items,
            mode: 'payment'
        });

        res.json({success: true, session_url: session.url})
    } catch(err) {
        console.log(err);
        return res.status(500).json({ success: false, message: err.message });
    }
}

const verifyStripe = async(req, res) => {
    const { orderId, success, userId } = req.body;
    try {
        if(success === "true") {
            await Order.findByIdAndUpdate(orderId, { payment: true });
            await User.findByIdAndUpdate(userId, {cartData: {}});
            res.status(200).json({ success: true });
        } else {
            await Order.findByIdAndDelete(orderId);
            res.status(200).json({ success: false });
        }
    } catch(err) {
        console.log(err);
        return res.status(500).json({ success: false, message: err.message });
    }
}

const allOrders = async(req, res) => {
    try {
        const orders = await Order.find({});
        return res.status(200).json({ success: true, orders });
    } catch(err) {
        console.log(err);
        return res.status(500).json({ success: false, message: err.message });
    }
}

const userOrders = async(req, res) => {
    try {
        const { userId } = req.body;
        const orders = await Order.find({ userId });
        return res.status(200).json({ success: true, orders });
    } catch(err) {
        console.log(err);
        return res.status(500).json({ success: false, message: err.message });
    }
}

const updateStatus = async(req, res) => {
    try {
        const { orderId, status } = req.body;
        await Order.findByIdAndUpdate(orderId, { status });
        return res.status(200).json({ success: true, message: "Order status updated!" });
    } catch(err) {
        console.log(err);
        return res.status(500).json({ success: false, message: err.message });
    }
}

export { placeOrderByCOD, placeOrderByStripe, allOrders, userOrders, updateStatus, verifyStripe }