import * as mongoose from 'mongoose';

export const AuthSchema = new mongoose.Schema({
  userName: { type: String, required: false },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  admin: { type: Boolean, default: false, required: false },
  phoneNumber: { type: String, required: false },
  age: { type: String, required: false },
});

export interface Auth {
  userName: string;
  email: string;
  password: string;
  admin: boolean;
}
