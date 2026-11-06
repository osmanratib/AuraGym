import { Router } from 'express';
import { z } from 'zod';
import { createBooking, cancelBooking, getUserBookings } from '../controllers/bookingsController.js';
import { authenticate } from '../middleware/auth.js';
import { validate } from '../middleware/validate.js';

const router = Router();

const bookingSchema = z.object({
  class_id: z.string().uuid('Invalid class id'),
});

router.use(authenticate);

router.get('/my', getUserBookings);
router.post('/', validate(bookingSchema), createBooking);
router.delete('/:id', cancelBooking);

export default router;
