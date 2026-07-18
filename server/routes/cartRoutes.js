import express from 'express';
import { addToCart, getUserCart, updateCart } from '../controllers/cartController.js';
import authUser from '../middleware/auth.js';

const router = express.Router();

router.post('/get', authUser, getUserCart);
router.post('/add', authUser, addToCart);
router.post('/update', authUser, updateCart);

export default router;