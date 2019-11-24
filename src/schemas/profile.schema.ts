import { Schema, Document } from 'mongoose';
import { format as formatRut } from 'rut.js';
enum Sex { masculine = 'M', feminine = 'F' }

export const profileSchema = new Schema({
  rut: {
    type: String,
    set: (val) => {
      return formatRut(val);
    },
    get: (val) => {
      return formatRut(val);
    },
  },
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
