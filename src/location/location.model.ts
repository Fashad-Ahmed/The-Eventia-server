import * as mongoose from 'mongoose';
const Schema = mongoose.Schema;

export const LocationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  cId: { type: String, required: true },
});

export interface Location {
  name: string;
  cId: string;
}
