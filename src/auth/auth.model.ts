import * as mongoose from 'mongoose';

export const AuthSchema = new mongoose.Schema({
  userName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  admin: { type: Boolean, default: false },
  phoneNumber: { type: String, required: false },
  age: { type: String, required: false },
});

export interface Auth {
  userName: string;
  email: string;
  password: string;
  admin: boolean;
}