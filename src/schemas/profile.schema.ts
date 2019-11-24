import { Schema, Document } from 'mongoose';
enum Sex { masculine = 'M', feminine = 'F' }

export const profileSchema = new Schema({
  rut: String,
  name: String,
  last_name: String,
  phone: String,
  sex: {
    type: String,
    enum: ['M', 'F'],
  },
  email: String,
  addresses: [String],
}, {
  timestamps: true,
});

export interface Iprofile extends Document {
  readonly rut: string;
  readonly name: string;
  readonly last_name: string;
  readonly phone: string;
  readonly sex: Sex;
  readonly email: string;
  readonly addresses: [string];
  readonly createdAt: Date;
  readonly updatedAt: Date;
}
