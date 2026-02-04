import express from 'express';
import mongoose from "mongoose";
import productsRouter from './routes/products.route';

const app = express();
const port = 3000;

mongoose.connect('mongodb+srv://Hatoom:jytwiw-1sakFu-jydtow@cluster0.17yy5ai.mongodb.net/products-db')
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