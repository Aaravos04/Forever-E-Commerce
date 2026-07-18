import React, { useContext, useEffect } from 'react';
import { ShopContext } from '../context/ShopContext';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const Verify = () => {
    const { navigate, token, setCartItems, backendURL } = useContext(ShopContext);
    const [searchParams, setSearchParams] = useSearchParams();
    
    const success = searchParams.get('success');
    const orderId = searchParams.get('orderId');

    const verifyPayment = async() => {
        try {
            if(!token) return;
            const res = await axios.post(backendURL + '/api/order/verifyStripe', {success, orderId}, {headers: {token}});
            if(res.data.success) {
                toast.success('Payment successful!');
                setCartItems([]);
                navigate('/orders');
            } else {
                toast.error('Payment failed!');
                navigate('/cart');
            }
        } catch(err) {
            console.log(err);
            toast.error('Failed to verify payment');
            navigate('/cart');
        }
    }

    useEffect(() => {
        verifyPayment();
    }, [token])

  return (
    <div>
        
    </div>
  );
}

export default Verify;