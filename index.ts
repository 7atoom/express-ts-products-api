import express from 'express';
import productsRouter from './routes/products.route';
import { env } from './config/env';
import {connectDB} from "./config/db";
import {errorHandler, notFoundHandler} from "./middlewares/error.middleware";

const app = express();

app.use(express.json());
app.use('/api/products', productsRouter);

app.use(notFoundHandler);
app.use(errorHandler);

const startServer = async () => {
    try {
        await connectDB();

        app.listen(env.PORT, () => {
            console.log(`Server is running on http://localhost:${env.PORT}`);
            console.log(`Environment: ${env.NODE_ENV}`);
        });
    } catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
};

startServer().then(() =>
console.log('Server started successfully'));