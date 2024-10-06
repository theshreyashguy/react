import { createOrder, getOrderById ,getOrdersById, deleteOrder , updateOrder } from '@order/services/order.service';
import { BadRequestError, NotFoundError } from '@theshreyashguy/coffee-shared';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { orderSchema } from '@order/schemes/order.schemes';
// import { publishDirectMessage} from '@order/queues/auth.producer';
// import { orderChannel } from '@order/server';

export async function create(req: Request, res: Response): Promise<void> {
  const { error } = await Promise.resolve(orderSchema.validate(req.body));
  if (error?.details) {
    throw new BadRequestError(error.details[0].message, 'Order create() method error');
  }

  const order = await createOrder(req.body);
  //publishDirectMessage(orderChannel,'coffee-order-notification','order-push','Order created successfully','created order');
  res.status(StatusCodes.CREATED).json({ message: 'Order created successfully', order });
}


export async function read(req: Request, res: Response): Promise<void> {
  const orderId = req.params.orderId;
  const order = await getOrderById(orderId);
  
  if (!order) {
    throw new NotFoundError('Order not found', 'Order read() method error');
  }

  res.status(StatusCodes.OK).json({ order });
}

export async function readByUserId(req: Request, res: Response): Promise<void> {
  const userId = req.params.userId;
  const orders = await getOrdersById(userId);
  
  // if (!orders || orders.length === 0) {
  //   throw new NotFoundError('Orders not found for the user', 'Order readByUserId() method error');
  // }

  res.status(StatusCodes.OK).json({ orders: orders });
}

export async function update(req: Request, res: Response): Promise<void> {
  const orderId = req.params.orderId;
  const { error } = await Promise.resolve(orderSchema.validate(req.body, { allowUnknown: true }));
  if (error?.details) {
    throw new BadRequestError(error.details[0].message, 'Order update() method error');
  }

  const updatedOrder = await updateOrder(orderId, req.body);
  
  if (!updatedOrder) {
    throw new NotFoundError('Order not found for update', 'Order update() method error');
  }
  // publishDirectMessage(orderChannel,'coffee-order-notification','order-push','Order updated successfully','created updated');
  res.status(StatusCodes.OK).json({ message: 'Order updated successfully', order: updatedOrder });
}

export async function remove(req: Request, res: Response): Promise<void> {
  const orderId = req.params.orderId;
  const deletedOrder = await deleteOrder(orderId);
  
  if (!deletedOrder) {
    throw new NotFoundError('Order not found for deletion', 'Order remove() method error');
  }
  // publishDirectMessage(orderChannel,'coffee-order-notification','order-push','Order removed successfully','removed order');
  res.status(StatusCodes.OK).json({ message: 'Order deleted successfully', order: deletedOrder });
}


