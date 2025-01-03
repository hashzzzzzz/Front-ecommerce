import dotenv from 'dotenv';
dotenv.config(); // Make sure to load environment variables
console.log('STRIPE_SECRET_KEY:', process.env.STRIPE_SECRET_KEY);

import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';


import { useri as users } from './routes/users.js';
import { orderi as orders } from './routes/orders.js';
import { produkti as products } from './routes/products.js';
import { categoryprodukti as categoryproduct } from './routes/categoryproduct.js';
import { router as card } from './routes/card.js';
import paymenti from './routes/payment.js';

const app = express();

// Database Connection
mongoose.connect(process.env.DBCONN, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;

db.on('error', (error) => {
    console.error('Error connecting to the database:', error.message);
});

db.once('open', () => {
    console.log('Connected to the database');
});

// Middleware
app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.options('*', cors());
app.use(express.json());

// Routes
app.use('/api/cards', card);
app.use('/api/users', users); // User routes
app.use('/orders', orders); // Order routes
app.use('/payment', paymenti); // Payment routes
app.use('/products', products); // Product routes
app.use('/categoryprodukti', categoryproduct); // Category product routes

// Default Route for Health Check
app.get('/', (req, res) => {
    res.status(200).json({ message: 'API is running successfully!' });
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
