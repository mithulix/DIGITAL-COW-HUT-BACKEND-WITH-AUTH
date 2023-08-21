import { Schema, model } from 'mongoose';
import { IUser, UserModel, userRoles } from './user.interface';

const userSchema = new Schema<IUser>(
  {
    phoneNumber: { type: String, required: true, unique: true },
    role: { type: String, enum: userRoles, required: true },
    password: { type: String, required: true },
    name: {
      type: {
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
      },
    },
    address: { type: String, required: true },
    budget: { type: Number, required: true },
    income: { type: Number, required: true },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
  },
);

export const User = model<IUser, UserModel>('User', userSchema);
