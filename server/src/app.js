import express from 'express';
import cors from 'cors';
import { rateLimit } from 'express-rate-limit';
import cookieParser from 'cookie-parser';
// routes
import serverRoutes from './routes/index.js';

const app = express();

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    credentials: true,
    origin: "*",
}));
app.use(cookieParser());

const rateLimiting = rateLimit({
    windowMs: 1 * 60 * 60 * 1000,
    limit: 100,
    standardHeaders: true,
    legacyHeaders: false,
})

app.use(rateLimit(rateLimiting));

// routes
app.use("/api/v1", serverRoutes);

export default app;


