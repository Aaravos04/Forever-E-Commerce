import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from './Title.jsx';
import ProductItem from './ProductItem.jsx';

const RelatedProducts = ({ category, subCategory }) => {
    const { products } = useContext(ShopContext);
    const [related, setRelated] = useState([]);

    useEffect(() => {
        if(!products.length)
            return;
        let copy = products.slice();
        copy = copy.filter(item => item.category === category && item.subCategory === subCategory);
        copy = copy.slice(0, 5);
        setRelated(copy);
    }, [products])

  return (
    <div className='my-24'>
        <div className="text-center text-3xl py-2">
            <Title text1={'RELATED'} text2={'PRODUCTS'} />
        </div>

        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
            {related.map((item, index) => 
                <ProductItem key={index} id={item._id} image={item.image} name={item.name} price={item.price} />
            )}
        </div>
    </div>
  );
}

export default RelatedProducts;