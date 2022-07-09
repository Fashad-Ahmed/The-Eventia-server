import * as mongoose from 'mongoose';
const Schema = mongoose.Schema;

export const VendorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  cId: { type: String, required: true },
});

export interface Vendor {
  name: string;
  description: string;
  phoneNumber: string;
  cId: string;
}
