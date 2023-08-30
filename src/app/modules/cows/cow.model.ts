import { Schema, model } from 'mongoose';
import { CowModel, ICow } from './cow.interface';
import { cowBreed, cowCategory, cowLabel, cowLocation } from './cow.constant';
import { ApiError } from '../../../shared/errors/ApiError';
import httpStatus from 'http-status';


export const CowSchema = new Schema<ICow, CowModel>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    age: {
      type: Number,
      required: true,
    },

    price: {
      type: Number,
      required: true,
    },

    weight: {
      type: Number,
      required: true,
    },

    breed: {
      type: String,
      enum: cowBreed,
    },
    label: {
      type: String,
      enum: cowLabel,
    },
    location: {
      type: String,
      enum: cowLocation,
    },
    category: {
      type: String,
      enum: cowCategory,
    },

    seller: {
      type: Schema.Types.ObjectId,
      ref: 'Seller',
      required: true,
    },

    profileImage: {
      type: String,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  },
);

CowSchema.pre('save', async function (next) {
  if (this.isModified('label') && this.label === 'sold out') {
    return next();
  }
  const isExist = await Cow.findOne({ name: this.name });
  if (isExist) {
    throw new ApiError(httpStatus.CONFLICT, 'This Cow is already exist!');
  }
  next();
});

export const Cow = model<ICow, CowModel>('Cow', CowSchema);
