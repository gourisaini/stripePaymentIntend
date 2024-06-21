import express from "express";
import Transaction from "../model/payments.js";
import Stripe from 'stripe';

const stripe = Stripe(process.env.StripeKey);

const paymentRoute = express.Router();

paymentRoute.post('/payment', async (req, res) => {
    const { amount, currency, email } = req.body;

    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount,
            currency: currency,
            description: 'Example Payment',
            receipt_email: email,
        });

        res.status(200).json({
            clientSecret: paymentIntent.client_secret,
        });
    } catch (error) {
        console.error('Error creating payment:', error);
        res.status(500).json({ error: 'Failed to create payment' });
    }
});

paymentRoute.post('/add-payment', async (req, res) => {
    try {
        const data = Transaction.create(req.body)
        res.status(200).json(data);
    } catch (error) {
        console.error('Error creating payment:', error);
        res.status(500).json({ error: 'Failed to create payment' });
    }
});


export default paymentRoute;