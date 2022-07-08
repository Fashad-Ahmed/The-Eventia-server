import * as mongoose from 'mongoose';
const Schema = mongoose.Schema;

export const AdminSchema = new mongoose.Schema({
  createdAt: { type: Date, required: true },
  adminId: {
    type: Schema.Types.ObjectId,
    ref: 'Auth',
    required: false,
  },
});

export interface Admin {
  createdAt: Date;
  adminId: string;
}
