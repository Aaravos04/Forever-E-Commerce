import express from 'express';
import { placeOrderByCOD, placeOrderByStripe, allOrders, userOrders, updateStatus, verifyStripe } from '../controllers/orderController.js'
import adminAuth from '../middleware/adminAuth.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.post('/list', adminAuth, allOrders);
router.post('/status', adminAuth, updateStatus);

router.post('/cod', auth, placeOrderByCOD);
router.post('/stripe', auth, placeOrderByStripe);
router.post('/verifyStripe', auth, verifyStripe);

router.post('/userorders', auth, userOrders);

export default router;