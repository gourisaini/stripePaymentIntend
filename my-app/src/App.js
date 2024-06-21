import React, { useContext, useEffect, useState } from 'react';
import CardComponent from './components/Card.js';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { EcommerceContext } from './context/index.js';
import Login from './components/Login.js';
import AddToCart from './components/AddToCart.js';
import { Button } from '@mui/material';

const App = () => {
  const { user, setUser, showCart, setShowCart } = useContext(EcommerceContext)

  const handleSignOut = () => {
    localStorage.removeItem("userId")
    setUser(null)
  }

  const clientId = process.env.REACT_APP_CLIENT_ID
  console.log(clientId)
  return (
    <>
      <GoogleOAuthProvider clientId={clientId}>
        {user && (<>
          <Button onClick={() => { setShowCart(!showCart) }} sx={{ margin: "20px" }} variant='contained'>
            {showCart ? "Home" : " Cart"}
          </Button>
          <Button onClick={handleSignOut} sx={{ margin: "20px" }} variant='contained'>
            sign out
          </Button></>)}
        {showCart ?
          <AddToCart />
          :
          user ? <CardComponent /> : <Login />}

      </GoogleOAuthProvider>;
    </>
  );
};

export default App;
