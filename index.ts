import express from 'express';
import productsRouter from './routes/products.route';

const app = express();
const port = 3000;

app.use(express.json());

app.use('/api/products', productsRouter);

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});