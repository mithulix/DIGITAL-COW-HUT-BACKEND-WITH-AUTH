import { Types } from "mongoose";
import { USER_ENUM } from "../../../enum/userEnum";
import User from "../users/user.model";
import Cow from "./cow.model";

export const isCowFound = async (id: string): Promise<boolean> => {
  const cow = await Cow.findById(id);
  return !!cow;
};

export const isSeller = async (_id: Types.ObjectId) => {
  const seller = await User.findOne({ _id, role: USER_ENUM.SELLER });
  return !!seller;
};
