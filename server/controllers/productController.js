import { v2 as cloudinary } from "cloudinary";
import Product from "../models/productModel.js";

const addProduct = async (req, res) => {
    try {
        const { name, description, price, category, subCategory, sizes, bestSeller } = req.body;
        const image1 = req.files.image1 && req.files.image1[0];
        const image2 = req.files.image2 && req.files.image2[0];
        const image3 = req.files.image3 && req.files.image3[0];
        const image4 = req.files.image4 && req.files.image4[0];

        const images = [image1, image2, image3, image4].filter(image => image !== undefined);
        const imageURL = await Promise.all(images.map(async image => {
            const result = await cloudinary.uploader.upload(image.path, {
                resource_type: 'image',
            });

            return result.secure_url;
        }));

        const ProductData = {
            name, description, category, subCategory,
            price: Number(price),
            bestSeller: bestSeller === 'true',
            sizes: JSON.parse(sizes),
            image: imageURL,
            date: Date.now(),
        };

        const newProduct = new Product(ProductData);
        const product = await newProduct.save();
        res.json({ success: true, message: "Product added successfully!", _id: product._id });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: error.message });
    }
}

const allProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.json({ success: true, products });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: error.message });
    }
}

const getProduct = async (req, res) => {
    try {
        const { id } = req.body;
        const product = await Product.findById(id);
        res.json({ success: true, product });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ success: false, message: err.message });
    }
}

const removeProduct = async (req, res) => {
    try {
        const { id } = req.body;
        await Product.findByIdAndDelete(id);
        res.json({ success: true, message: "Product removed successfully!" });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: error.message });
    }
}

export { addProduct, allProducts, getProduct, removeProduct };