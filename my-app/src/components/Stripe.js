import React, { useState, useEffect, useContext } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { EcommerceContext } from '../context';
import { addPayment, payment } from '../services';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_KEY);

const CheckoutForm = ({ totalPrice, onClose }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [loading, setLoading] = useState(false);
    const [paymentError, setPaymentError] = useState(null);
    const [paymentSuccess, setPaymentSuccess] = useState(false);
    const [email, setEmail] = useState('');
    const [expired, setExpired] = useState(false);
    const [check, setCheck] = useState(false);

    const { user } = useContext(EcommerceContext)

    const fetchPaymentIntent = async () => {
        try {
            const response = await payment(totalPrice)
            const { clientSecret } = response.data;
            setCheck(true)
            startExpirationTimer();
            return clientSecret;
        } catch (error) {
            console.error('Error creating payment intent:', error);
            setPaymentError('Error creating payment intent. Please try again.');
        }
    };

    const startExpirationTimer = () => {
        setTimeout(() => {
            setExpired(true);
        }, 60 * 1000);
    };

    useEffect(() => {
        if (expired) {
            setPaymentError("Session Expire");
            setPaymentSuccess(false);
        }
    }, [expired]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!stripe || !elements) {
            return;
        }
        setLoading(true);
        try {
            const clientSecret = await fetchPaymentIntent();
            if (!clientSecret) {
                setLoading(false);
                return;
            }
            const result = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: elements.getElement(CardElement),
                    billing_details: {
                        email: email,
                    },
                },
            });

            if (result.error) {
                console.error('Payment failed:', result.error.message);
                setPaymentError(result.error.message);
                setPaymentSuccess(false);
            } else {
                console.log('Payment succeeded:', result.paymentIntent);
                setPaymentError(null);
                setPaymentSuccess(true);
                onClose()
                setPaymentSuccess(true)
            }
            await addPayment(totalPrice, email, user)
        } catch (error) {
            console.error('Error:', error);
            setPaymentError('Error processing payment. Please try again.');
            setPaymentSuccess(false);
        }
        setLoading(false);
    };

    return (
        <div>
            <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />
            <CardElement />
            {check ? <button onClick={handleSubmit} disabled={!stripe || loading || expired}>
                Pay
            </button> : <button onClick={fetchPaymentIntent} disabled={!stripe || loading || expired}>
                {loading ? 'Processing...' : 'Verify'}
            </button>}
            {expired && <div>Session expired. Please refresh the page to try again.</div>}
            {paymentError && <div>{paymentError}</div>}
            {paymentSuccess && <div>Payment succeeded!</div>}
        </div>
    );
};


const StripePayment = ({ totalPrice, onClose, setPaymentSuccess }) => {
    return (
        <Elements stripe={stripePromise}>
            <CheckoutForm totalPrice={totalPrice} onClose={onClose} setPaymentSuccess={setPaymentSuccess} />
        </Elements>
    );
};

export default StripePayment;
