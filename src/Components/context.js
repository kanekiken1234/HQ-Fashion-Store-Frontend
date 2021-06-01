import React, { createContext, useState } from 'react';

export const NumItems = createContext();
export const LoggedIn = createContext();
export const CurrentUser = createContext();
export const Cart = createContext();
export const TotalCost = createContext();

const TotalCostProvider = (props) => {
    const [total, setTotal] = useState(0);
    return (
        <TotalCost.Provider value={{ total, setTotal }}>
            {props.children}
        </TotalCost.Provider>
    )
}

const NumItemsProvider = (props) => {
    const [items, setItems] = useState(0);
    return (
        <NumItems.Provider value={{
            items,
            setItems
        }}>
            {props.children}
        </NumItems.Provider>
    )
}

const LoggedInProvider = (props) => {
    const [logged, setLogged] = useState(false)
    return (
        <LoggedIn.Provider value={{
            logged,
            setLogged
        }}>
            {props.children}
        </LoggedIn.Provider>
    )
}



const CurrentUserProvider = (props) => {
    const [userEmail, setUserEmail] = useState(null);
    const [userName, setUserName] = useState(null);

    return (
        <CurrentUser.Provider value={{
            userEmail,
            userName,
            setUserEmail,
            setUserName
        }}>
            {props.children}
        </CurrentUser.Provider>
    )
}

const CartProvider = (props) => {
    const [cart, setCart] = useState([]);
    return (
        <Cart.Provider value={{
            cart,
            setCart
        }}>
            {props.children}
        </Cart.Provider>
    )
}




export {
    LoggedInProvider,
    NumItemsProvider,
    CurrentUserProvider,
    CartProvider,
    TotalCostProvider
}