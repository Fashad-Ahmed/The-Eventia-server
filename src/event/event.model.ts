import * as mongoose from 'mongoose';
const Schema = mongoose.Schema;

export const EventSchema = new mongoose.Schema({
  name: { type: String, required: true },
  createdAt: { type: Date, required: true },
  description: { type: String, required: false },
  category: { type: String, required: false },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'Auth',
    required: false,
  },
});

export interface Event {
  name: string;
  createdAt: Date;
  description: string;
  category: string;
  userId: string;
}
