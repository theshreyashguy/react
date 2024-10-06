import { config } from '@order/config';
import { IOrder, Order } from '@order/models/order.schema';
import { IPayment, Payment } from '@order/models/payment.schema';
import { winstonLogger } from '@theshreyashguy/coffee-shared';
import { Logger } from 'winston';

const log: Logger = winstonLogger(`${config.ELASTIC_SEARCH_URL}`, 'authService', 'debug');

// Create an order
export const createOrder = async (orderData: IOrder): Promise<IOrder> => {
  try {
    log.info('Creating a new order', { orderData });
    const order = new Order(orderData);
    const savedOrder = await order.save();
    const paymentData: any = {
        orderId : orderData.orderId,
        paymentDate:orderData.orderDate,
        status:'Pending',
        paymentId:orderData.paymentId,
        amount:orderData.totalAmount,
    }
    createPayment(paymentData)
    log.info('Order created successfully', { orderId: savedOrder.orderId , paymentID : savedOrder.paymentId });
    return savedOrder;
  } catch (error) {
    log.error('Error creating order:', { error, orderData });
    throw error;
  }
};


export const getOrderById = async (orderId: string): Promise<IOrder | null> => {
  try {
    log.info('Retrieving order by ID', { orderId });
    const order = await Order.findOne({ orderId }).exec();
    log.info(order);
    if (order) {
      log.info('Order retrieved successfully', { orderId });
    } else {
      log.warn('Order not found', { orderId });
    }
    return order;
  } catch (error) {
    log.error('Error retrieving order:', { error, orderId });
    throw error;
  }
};


// Get an orders by userID
export const getOrdersById = async (userId: string): Promise<IOrder[] | null> => {
  try {
    log.info(`Retrieving order by ID ${userId}`, { userId });
    const order = await Order.find({userId: userId }).exec();
    if (order) {
      log.info('Order retrieved successfully', { userId });
    } else {
      log.warn('Order not found', { userId });
    }
    log.info(order.length);
    return order;
  } catch (error) {
    log.error('Error retrieving order:', { error, userId });
    throw error;
  }
};

// Update an order
export const updateOrder = async (orderId: string, updateData: Partial<IOrder>): Promise<IOrder | null> => {
  try {
    log.info('Updating order', { orderId, updateData });
    const updatedOrder = await Order.findOneAndUpdate({ orderId }, updateData, { new: true }).exec();
    if (updatedOrder) {
      log.info('Order updated successfully', { orderId });
    } else {
      log.warn('Order not found for update', { orderId });
    }
    return updatedOrder;
  } catch (error) {
    log.error('Error updating order:', { error, orderId, updateData });
    throw error;
  }
};

// Delete an order
export const deleteOrder = async (orderId: string): Promise<IOrder | null> => {
  try {
    log.info('Deleting order', { orderId });
    const deletedOrder = await Order.findOneAndDelete({ orderId }).exec();
    if (deletedOrder) {
      log.info('Order deleted successfully', { orderId });
    } else {
      log.warn('Order not found for deletion', { orderId });
    }
    return deletedOrder;
  } catch (error) {
    log.error('Error deleting order:', { error, orderId });
    throw error;
  }
};

// Create a payment
export const createPayment = async (paymentData: IPayment): Promise<IPayment> => {
  try {
    log.info('Creating a new payment', { paymentData });
    const payment = new Payment(paymentData);
    const savedPayment = await payment.save();
    log.info('Payment created successfully', { paymentId: savedPayment.paymentId });
    return savedPayment;
  } catch (error) {
    log.error('Error creating payment:', { error, paymentData });
    throw error;
  }
};

// Get a payment by ID
export const getPaymentById = async (paymentId: string): Promise<IPayment | null> => {
  try {
    log.info('Retrieving payment by ID', { paymentId });
    const payment = await Payment.findOne({ paymentId }).exec();
    if (payment) {
      log.info('Payment retrieved successfully', { paymentId });
    } else {
      log.warn('Payment not found', { paymentId });
    }
    return payment;
  } catch (error) {
    log.error('Error retrieving payment:', { error, paymentId });
    throw error;
  }
};

// Update a payment
export const updatePayment = async (paymentId: string, updateData: Partial<IPayment>): Promise<IPayment | null> => {
  try {
    log.info('Updating payment', { paymentId, updateData });
    const updatedPayment = await Payment.findOneAndUpdate({ paymentId }, updateData, { new: true }).exec();
    if (updatedPayment) {
      log.info('Payment updated successfully', { paymentId });
    } else {
      log.warn('Payment not found for update', { paymentId });
    }
    return updatedPayment;
  } catch (error) {
    log.error('Error updating payment:', { error, paymentId, updateData });
    throw error;
  }
};

// Delete a payment
export const deletePayment = async (paymentId: string): Promise<IPayment | null> => {
  try {
    log.info('Deleting payment', { paymentId });
    const deletedPayment = await Payment.findOneAndDelete({ paymentId }).exec();
    if (deletedPayment) {
      log.info('Payment deleted successfully', { paymentId });
    } else {
      log.warn('Payment not found for deletion', { paymentId });
    }
    return deletedPayment;
  } catch (error) {
    log.error('Error deleting payment:', { error, paymentId });
    throw error;
  }
};
