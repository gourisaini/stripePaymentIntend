import React, { useState, useEffect } from 'react';
import { deleteCart, getUser } from '../services';
import { Button, Snackbar } from '@mui/material';
import FormDialog from './FormDialog';

const AddToCart = () => {
    const userId = localStorage.getItem("userId");
    const [data, setData] = useState([]);
    const [openDialog, setOpenDialog] = useState(false);
    const [paymentSuccess, setPaymentSuccess] = useState(false);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getUser(userId);
                setData(response?.cart || []);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };
        fetchData();
    }, [userId]);

    const totalPrice = data.reduce((acc, item) => acc + item.price, 0);

    const handleOpenDialog = () => {
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    const removeCart = async (index) => {
        const id = localStorage.getItem("userId")
        const data = await deleteCart(id, index)
        console.log(data)
        setData(data.cart)
    };

    return (
        <div>
            <ul>
                {data.map((item, index) => (
                    <li key={index}>
                        Title - {item.title}, Price - {item.price} &nbsp;
                        <button onClick={() => { removeCart(index) }}>
                            remove
                        </button>
                    </li>
                ))}
            </ul>
            <p style={{ marginLeft: "20px" }}>Total Price: {totalPrice}</p>
            <Button
                onClick={handleOpenDialog}
                sx={{ margin: "20px" }}
                variant="contained"
            >
                Checkout
            </Button>
            <FormDialog
                open={openDialog}
                handleClose={handleCloseDialog}
                totalPrice={totalPrice}
                setPaymentSuccess={setPaymentSuccess}
            />
            {paymentSuccess && (<Snackbar
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                open={paymentSuccess}
                autoHideDuration={3000}
                onClose={() => setPaymentSuccess(false)}
                message="Payment successfully completed"
            />)}
        </div>
    );
};

export default AddToCart;
