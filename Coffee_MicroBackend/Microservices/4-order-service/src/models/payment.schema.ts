import mongoose, { Schema, Document } from "mongoose";
import { v4 as uuidv4 } from 'uuid';

export interface IPayment extends Document {
    paymentId: string;
    orderId: string;
    amount: number;
    paymentDate: Date;
    status: 'Pending' | 'Completed' | 'Failed';
}

const PaymentSchema: Schema = new Schema({
    paymentId: { type: String, required: true, unique: true },
    orderId: { type: String, required: true },
    amount: { type: Number, required: true },
    paymentDate: { type: Date, default: Date.now },
    status: { type: String, enum: ['Pending', 'Completed', 'Failed'], required: true },
});

PaymentSchema.pre<IPayment>('save', function (next) {
    if (!this.paymentId) {
        this.paymentId = uuidv4(); // Generate a unique UUID if not set
    }
    next();
});

export const Payment = mongoose.model<IPayment>('Payment', PaymentSchema);
