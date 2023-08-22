import mongoose, { Schema, model } from 'mongoose';
import { cowBreeds, cowLabels, cowLocations } from './cow.constant';
import { CowModel, ICow } from './cow.interface';

const cowSchema = new Schema<ICow>(
  {
    name: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    location: {
      type: String,
      enum: cowLocations,
      required: true,
    },
    breed: {
      type: String,
      enum: cowBreeds,
      required: true,
    },
    weight: {
      type: Number,
      required: true,
    },
    label: {
      type: String,
      enum: cowLabels,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  },
);
export const Cow = model<ICow, CowModel>('Cow', cowSchema);
