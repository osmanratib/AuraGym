import { Router } from 'express';
import { getPlans } from '../controllers/plansController.js';

const router = Router();

router.get('/', getPlans);

export default router;
