import * as mongoose from 'mongoose';
const Schema = mongoose.Schema;

export const LocationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: String, required: true },
  cId: {
    type: Schema.Types.ObjectId,
    ref: 'Admin',
    required: false,
  },
});

export interface Location {
  name: string;
  price: string;
  cId: string;
}
