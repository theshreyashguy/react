import { Router } from 'express';
import { create, read, readByUserId, update, remove } from '@order/controllers/order.controller';

const orderRoutes: Router = Router();

orderRoutes.post('/orders', create); // Create a new order
orderRoutes.get('/orders/:orderId', read); // Get an order by ID
orderRoutes.get('/orders/user/:userId', readByUserId); // Get orders by user ID
orderRoutes.put('/orders/:orderId', update); // Update an order by ID
orderRoutes.delete('/orders/:orderId', remove); // Delete an order by ID

export default orderRoutes;
