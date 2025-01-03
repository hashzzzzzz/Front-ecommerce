import express from 'express';
import Stripe from 'stripe';

const paymenti = express.Router();

// Make sure the Stripe key is loaded properly
console.log('Stripe Secret Key:', process.env.STRIPE_SECRET_KEY);  // Debugging line to confirm the value

const stripe = new Stripe('sk_test_51QVgxiDmrMV3SZ5ybo580ZE02zSCMPzrmyr76zmUvZ4AFXwTlxCcId6S5hYR8Jxwq95kVa3MucEoSAlGZQE3e5ZV00YP4mp51B', { apiVersion: '2022-11-15' });



// Payment route
paymenti.post('/create-payment-intent', async (req, res) => {
    const { amount } = req.body; // Receive the payment amount in cents from the frontend

    try {
        // Create a payment intent
        const paymentIntent = await stripe.paymentIntents.create({
            amount, // Amount in cents (e.g., $50.00 -> 5000)
            currency: 'usd', // Set your currency
            payment_method_types: ['card'], // Accept cards as payment
        });

        res.status(200).send({
            clientSecret: paymentIntent.client_secret,
        });
    } catch (error) {
        console.error('Error creating payment intent:', error);
        res.status(500).json({ error: error.message });
    }
});

export default paymenti; // Ensure default export
