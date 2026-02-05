import express from 'express';
import mongoose from "mongoose";
import productsRouter from './routes/products.route';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = 3000;

mongoose.connect(process.env.MONGO_URL || 'mongodb://localhost:27017/productsdb', {})
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch(err => {
        console.error('Failed to connect to MongoDB', err);
    });

app.use(express.json());

app.use('/api/products', productsRouter);

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});