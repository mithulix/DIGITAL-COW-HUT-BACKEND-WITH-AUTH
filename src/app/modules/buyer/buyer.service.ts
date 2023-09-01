import { IBuyer } from './buyer.interface';
import { Buyer } from './buyer.model';

//-----------get all buyers -------------------------
const getAllBuyers = async () => {
  const result = await Buyer.find({});
  return result;
};

//-----------get single buyer -------------------------
const getSingleBuyer = async (id: string) => {
  const result = await Buyer.findById(id);

  return result;
};

//-----------update a buyer -------------------------
const updateBuyer = async (id: string, payload: Partial<IBuyer>) => {
  const result = await Buyer.findByIdAndUpdate({ _id: id }, payload, {
    new: true,
  });

  return result;
};

//-----------delete a buyer -------------------------
const deleteBuyer = async (id: string) => {
  const result = await Buyer.findByIdAndDelete(id);
  return result;
};

export const BuyerService = {
  getAllBuyers,
  getSingleBuyer,
  deleteBuyer,
  updateBuyer,
};
