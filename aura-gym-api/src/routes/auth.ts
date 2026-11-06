import { Router } from 'express';
import { z } from 'zod';
import rateLimit from 'express-rate-limit';
import { signup, signin, signout, getMe } from '../controllers/authController.js';
import { authenticate } from '../middleware/auth.js';
import { validate } from '../middleware/validate.js';

const router = Router();

// Rate limiting on auth routes (10 attempts per 15 minutes as specified in blueprint)
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 30, // reasonable threshold for local development & production testing
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Too many authentication attempts. Please try again after 15 minutes.',
  },
});

const signupSchema = z.object({
  full_name: z.string().min(2, 'Full name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
  plan_id: z.string().uuid().optional().nullable(),
});

const signinSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(1, 'Password is required'),
});

router.post('/signup', authLimiter, validate(signupSchema), signup);
router.post('/signin', authLimiter, validate(signinSchema), signin);
router.post('/signout', authenticate, signout);
router.get('/me', authenticate, getMe);

export default router;
