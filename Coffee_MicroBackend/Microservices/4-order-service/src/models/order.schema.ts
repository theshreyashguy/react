import mongoose, { Schema, Document } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

export interface IOrder extends Document {
  orderId: string;
  paymentId: string;
  userId: string;
  items: Array<{
    coffeeId: number;
    quantity: number;
  }>;
  totalAmount: number;
  orderDate: Date;
}

const OrderSchema: Schema = new Schema({
  orderId: { type: String, required: true, unique: true },
  paymentId: { type: String },
  userId: { type: String, required: true },
  items: [
    {
      coffeeId: { type: Number, required: true },
      quantity: { type: Number, required: true },
    },
  ],
  totalAmount: { type: Number, required: true },
  orderDate: { type: Date, default: Date.now },
});


OrderSchema.pre<IOrder>('save', function (next) {
  if (!this.orderId) {
    this.orderId = uuidv4(); 
  }
  next();
});

export const Order = mongoose.model<IOrder>('Order', OrderSchema);


