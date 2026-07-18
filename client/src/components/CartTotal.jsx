import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title.jsx';

const CartTotal = () => {
    const {currency, delivery_charge, cartItems, getCartAmount} = useContext(ShopContext);
    const [value, setValue] = useState(0);

    useEffect(() => {
        setValue(getCartAmount());
    }, [cartItems])

  return (
    <div className='w-full'>
        <div className="text-2xl">
            <Title text1={'CART'} text2={'TOTALS'} />
        </div>

        <div className="flex flex-col gap-2 mt-2 text-sm">
            <div className="flex justify-between">
                <p>Subtotal</p>
                <p>{currency}{value}.00</p>
            </div>
            <hr />
            <div className="flex justify-between">
                <p>Shipping Fee</p>
                <p>{currency}{(value ? delivery_charge : 0)}.00</p>
            </div>
            <hr />
            <div className="flex justify-between">
                <b>Total</b>
                <b>{currency}{value + (value ? delivery_charge : 0)}.00</b>
            </div>
        </div>
    </div>
  )
}

export default CartTotal