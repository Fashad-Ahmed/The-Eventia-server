import * as mongoose from 'mongoose';
const Schema = mongoose.Schema;

export const AdminSchema = new mongoose.Schema({
  createdAt: { type: Date, required: true },
  userName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  adminStatus: { type: Boolean, default: true, required: false },
  phoneNumber: { type: String, required: false },
  age: { type: String, required: false },
});

export interface Admin {
  createdAt: Date;
  userName: string;
  email: string;
  password: string;
  adminStatus: boolean;
  phoneNumber: string;
  age: string;
}
