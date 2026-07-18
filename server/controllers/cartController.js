import User from "../models/userModel.js";

const addToCart = async(req, res) => {
    try {
        const { userId, itemId, size } = req.body;
        const userData = await User.findById(userId);
        if (!userData)
            return res.status(404).json({ success: false, message: "User not found." });

        let cartData = await userData.cartData;
        if(cartData[itemId]) {
            if(cartData[itemId][size])
                cartData[itemId][size]++;
            else
                cartData[itemId][size] = 1
        } else {
            cartData[itemId] = {};
            cartData[itemId][size] = 1;
        }

        await User.findByIdAndUpdate(userId, {cartData});
        return res.json({ success: true, message: "Added to cart." });
    } catch (error) {
        confirm(error.message);
        return res.status(500).json({ success: false, message: "Server error." });
    }
}

const updateCart = async(req, res) => {
    try {
        const { userId, itemId, size, quantity } = req.body;
        const userData = await User.findById(userId);
        if (!userData)
            return res.status(404).json({ success: false, message: "User not found." });
        
        let cartData = await userData.cartData;
        cartData[itemId][size] = quantity;

        await User.findByIdAndUpdate(userId, {cartData});
        return res.json({ success: true, message: "Cart Updated." });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ success: false, message: "Server error." });
    }
}

const getUserCart = async(req, res) => {
    try {
        const { userId } = req.body;
        const userData = await User.findById(userId);
        const cartData = await userData.cartData;
        return res.json({ success: true, cartData });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "Server error." });
    }
}

export { addToCart, updateCart, getUserCart };