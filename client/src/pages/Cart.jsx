import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from '../components/Title';
import { assets } from '../assets/assets';
import CartTotal from '../components/CartTotal';
import { toast } from 'react-toastify';

const Cart = () => {
  const { products, currency, cartItems, navigate,
    updateQuantity } = useContext(ShopContext);
  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    const temp = [];
    for(const items in cartItems) {
      for(const item in cartItems[items]) {
        if(cartItems[items][item])
          temp.push({
            _id: items,
            size: item,
            quantity: cartItems[items][item]
          });
      }
    }

    setCartData(temp);
  }, [cartItems])

  return (
    <div className='border-t pt-14'>
      <div className='text-2xl mb-3'>
        <Title text1={'YOUR'} text2={'CART'}/>
      </div>
      <div>
        {cartData.length ? cartData.map((item, index) => {
          const product = products.find((elem) => item._id === elem._id);
          return (
            <div key={index} className='py-4 border-t border-b text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4'>
              <div className='flex items-start gap-6'>
                <img className='w-16 sm:w-20' src={product.image[0]} alt="" />
                <div>
                  <p className='text-sx sm: text-lg font-medium'>{product.name}</p>
                  <div className="flex items-center gap-5 mt-2">
                    <p>{currency}{product.price}</p>
                    <p className='px-2 sm:px-3 sm:py-1 border bg-slate-50'>{item.size}</p>
                  </div>
                </div>
              </div>
              <input onChange={(e) => e.target.value && updateQuantity(item._id, item.size, Number.parseInt(e.target.value))} className='border max-w-10 sm:max-w-20 px-1 sm:px-2 py-1' type="number" defaultValue={item.quantity} min={1} />
              <img onClick={() => updateQuantity(item._id, item.size, 0)} className='w-4 mr-4 sm:w-5 cursor-pointer' src={assets.bin_icon} alt="" />
            </div>
          )
        }) : <div className='text-center text-xl text-gray-700'>Your cart is empty.</div>}
      </div>

      <div className="flex justify-end my-20">
        <div className="w-full sm:w-[450px]">
          <CartTotal />
          <div className='w-full text-end'>
            <button onClick={() => cartData.length ? navigate('/place-order') : toast.warn("Cart is empty.")} className='bg-black text-white text-sm my-8 px-8 py-3'>PROCEED TO CHECKOUT</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;