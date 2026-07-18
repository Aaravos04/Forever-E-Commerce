import { createContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
    const currency = '$';
    const delivery_charge = 10;
    const backendURL = import.meta.env.VITE_BACKEND_URL;
    const navigate = useNavigate();

    const [search, setSearch] = useState("");
    const [showSearch, setShowSearch] = useState(false);
    const [cartItems, setCartItems] = useState({});
    const [products, setProducts] = useState([]);
    const [token, setToken] = useState('');
    const location = useLocation();

    const addToCart = async (id, size) => {
        let cartData = {...cartItems};
        if(cartData[id]) {
            if(cartData[id][size])
                cartData[id][size]++;
            else
                cartData[id][size] = 1;
        } else {
            cartData[id] = {[size]: 1};
        }

        setCartItems(cartData);

        if(token) {
            try {
                await axios.post(backendURL + '/api/cart/add', {itemId: id, size}, {headers: {token}});
            } catch (err) {
                console.log(err);
            }
        }
    };

    const updateQuantity = async (id, size, quantity) => {
        let copy = {...cartItems};
        copy[id][size] = quantity;
        setCartItems(copy);

        if(token) {
            try {
                await axios.post(backendURL + '/api/cart/update', {itemId: id, size, quantity}, {headers: {token}});
            } catch(err) {
                console.log(err);
            }
        }
    }

    const getUserCart = async (token) => {
        try {
            const res = await axios.post(backendURL + '/api/cart/get', {}, {headers: {token}});
            if(res.data.success)
                setCartItems(res.data.cartData);
        } catch(err) {
            console.log(err);
        }
    }

    const getProductsData = async() => {
        try {
            const res = await axios.get(backendURL + '/api/products/all');
            if(res.data.success)
                setProducts(res.data.products);
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        getProductsData();
        if(!token && localStorage.getItem('token')) {
            setToken(localStorage.getItem('token'));
            getUserCart(localStorage.getItem('token'));
        }
    }, []);

    const getCartAmount = () => {
        let total = 0;
        for(const items in cartItems) {
            let itemInfo = products.find((product) => product._id === items);
            for(const item in cartItems[items])
                total += (itemInfo.price * cartItems[items][item]);
        }

        return total;
    }

    const value = {
        products, currency,
        delivery_charge, setCartItems,
        search, setSearch, getCartAmount,
        showSearch, setShowSearch,
        location, cartItems, addToCart,
        updateQuantity, navigate,
        backendURL, token, setToken
    };

    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    );
}

export default ShopContextProvider;