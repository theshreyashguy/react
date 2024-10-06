//import { publishDirectMessage } from '@order/queues/auth.producer';
import { paymentSchema } from '@order/schemes/payment.schemes';
// import { orderChannel } from '@order/server';
import { createPayment, getPaymentById, updatePayment, deletePayment } from '@order/services/order.service';
import { BadRequestError, NotFoundError } from '@theshreyashguy/coffee-shared';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

export async function create(req: Request, res: Response): Promise<void> {
  const { error } = await Promise.resolve(paymentSchema.validate(req.body));
  if (error?.details) {
    throw new BadRequestError(error.details[0].message, 'Payment create() method error');
  }

  const payment = await createPayment(req.body);
 // publishDirectMessage(orderChannel,'coffee-order-notification','order-push','payment created successfully','created payment');
  res.status(StatusCodes.CREATED).json({ message: 'Payment created successfully', payment });
}

export async function read(req: Request, res: Response): Promise<void> {
  const paymentId = req.params.paymentId;
  const payment = await getPaymentById(paymentId);
  
  if (!payment) {
    throw new NotFoundError('Payment not found', 'Payment read() method error');
  }

  res.status(StatusCodes.OK).json({ payment });
}

export async function update(req: Request, res: Response): Promise<void> {
  const paymentId = req.params.paymentId;
  const { error } = await Promise.resolve(paymentSchema.validate(req.body, { allowUnknown: true }));
  if (error?.details) {
    throw new BadRequestError(error.details[0].message, 'Payment update() method error');
  }

  const updatedPayment = await updatePayment(paymentId, req.body);
  
  if (!updatedPayment) {
    throw new NotFoundError('Payment not found for update', 'Payment update() method error');
  }
 // publishDirectMessage(orderChannel,'coffee-order-notification','order-push','payment updated successfully','updated payment');

  res.status(StatusCodes.OK).json({ message: 'Payment updated successfully', payment: updatedPayment });
}

export async function remove(req: Request, res: Response): Promise<void> {
  const paymentId = req.params.paymentId;
  const deletedPayment = await deletePayment(paymentId);
  
  if (!deletedPayment) {
    throw new NotFoundError('Payment not found for deletion', 'Payment remove() method error');
  }

 // publishDirectMessage(orderChannel,'coffee-order-notification','order-push','payment removed successfully','removed payment');

  res.status(StatusCodes.OK).json({ message: 'Payment deleted successfully', payment: deletedPayment });
}
