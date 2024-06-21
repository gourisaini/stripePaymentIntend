import React, { createContext, useEffect, useState } from "react";

export const EcommerceContext = createContext();

const Provider = ({ children }) => {
    const [product, setProduct] = useState([]);
    const [user, setUser] = useState(null);
    const [showCart, setShowCart] = useState(false);

    useEffect(() => {
        // const data = {
        //     name: localStorage.getItem("name"),

        //     userId: localStorage.getItem("userId"),

        //     email: localStorage.getItem("email"),

        //     picture: localStorage.getItem("picture")
        // }

        setUser(localStorage.getItem("userId"))
    }, [])

    return (
        <EcommerceContext.Provider value={{ product, setProduct, user, setUser, showCart, setShowCart }}>
            {children}
        </EcommerceContext.Provider>
    );
};

export default Provider;
