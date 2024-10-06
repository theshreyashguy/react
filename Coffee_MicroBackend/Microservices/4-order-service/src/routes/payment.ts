import { Router } from 'express';
import { create, read, update, remove } from '@order/controllers/payment.controller';

const router: Router = Router();

router.post('/payments', create); // Create a new payment
router.get('/payments/:paymentId', read); // Get a payment by ID
router.put('/payments/:paymentId', update); // Update a payment by ID
router.delete('/payments/:paymentId', remove); // Delete a payment by ID

export default router;
