import { Router } from 'express';
import { z } from 'zod';
import { createLead } from '../controllers/leadsController.js';
import { validate } from '../middleware/validate.js';

const router = Router();

const leadSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please provide a valid email'),
  phone: z.string().optional().nullable(),
  message: z.string().optional().nullable(),
  source: z.string().optional().default('website'),
});

router.post('/', validate(leadSchema), createLead);

export default router;
