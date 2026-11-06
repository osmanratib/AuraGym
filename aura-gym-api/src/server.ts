import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';
import plansRoutes from './routes/plans.js';
import classesRoutes from './routes/classes.js';
import bookingsRoutes from './routes/bookings.js';
import leadsRoutes from './routes/leads.js';
import { errorHandler } from './middleware/errorHandler.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:3000';

// Security & Middleware
app.use(helmet());
app.use(
  cors({
    origin: [CLIENT_URL, 'http://127.0.0.1:3000', 'http://localhost:3000'],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

// Health Check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', service: 'Aura Gym API', timestamp: new Date().toISOString() });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/plans', plansRoutes);
app.use('/api/classes', classesRoutes);
app.use('/api/bookings', bookingsRoutes);
app.use('/api/leads', leadsRoutes);

// Global Error Handler
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`[Aura Gym API] Server running on port ${PORT}`);
  console.log(`[Aura Gym API] Configured client origin: ${CLIENT_URL}`);
});

export default app;
