import * as mongoose from 'mongoose';
const Schema = mongoose.Schema;

export const EventSchema = new mongoose.Schema({
  name: { type: String, required: true },
  createdAt: { type: Date, required: false },
  description: { type: String, required: false },
  category: { type: String, required: false },
  price: { type: String, required: false },
  userId: {
    type: String,
    required: false,
  },
  adminId: {
    type: Schema.Types.ObjectId,
    ref: 'Admin',
    required: false,
  },
});

export interface Event {
  name: string;
  createdAt: Date;
  description: string;
  category: string;
  price: string;
  userId: string;
  adminId: string;
}
