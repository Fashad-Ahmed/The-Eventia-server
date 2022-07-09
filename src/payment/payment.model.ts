import * as mongoose from 'mongoose';
const Schema = mongoose.Schema;

export const PaymentSchema = new mongoose.Schema({
  createdAt: { type: Date, required: true },
  amount: { type: String, required: false },
  paymentMethod: { type: String, required: false },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'Auth',
    required: false,
  },
});

export interface Payment {
  createdAt: Date;
  amount: string;
  paymentMethod: string;
  userId: string;
}
