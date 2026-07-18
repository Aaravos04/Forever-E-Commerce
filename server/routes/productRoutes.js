import express from 'express';
import {
    addProduct,
    allProducts,
    getProduct,
    removeProduct
} from '../controllers/productController.js';
import upload from '../middleware/multer.js';
import adminAuth from '../middleware/adminAuth.js';

const rounter = express.Router();

rounter.post('/add', adminAuth, upload.fields([
    { name: 'image1', maxCount: 1 },
    { name: 'image2', maxCount: 1 },
    { name: 'image3', maxCount: 1 },
    { name: 'image4', maxCount: 1 }
]), addProduct);
rounter.get('/all', allProducts);
rounter.post('/get', getProduct);
rounter.post('/remove', adminAuth, removeProduct);

export default rounter;