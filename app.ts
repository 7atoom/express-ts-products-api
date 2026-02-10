import express from 'express';
import helmet from "helmet";
import cors from "cors";
import rateLimit from "express-rate-limit";
import { notFoundHandler, errorHandler } from './middlewares/error.middleware';
import router from './routes';
const app = express();
app.use(express.json());

// Security middlewares
app.use(helmet());
app.use(cors({
    origin: 'http://localhost:3000', // Adjust this to your frontend URL
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    message: 'Too many requests from this IP, please try again later.'
}));

// Routes


app.use(router);

app.use(notFoundHandler);
app.use(errorHandler);

export default app;