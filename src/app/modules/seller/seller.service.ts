import { ISeller } from './seller.interface';
import { Seller } from './seller.model';

//---------Get All Seller Service----------------------------------
const getAllSellers = async () => {
  const result = await Seller.find({});

  return result;
};

//---------Get Single Seller Service----------------------------------
const getSingleSeller = async (id: string) => {
  const result = await Seller.findById(id);

  return result;
};
//---------Update a Seller Service----------------------------------
const updateSeller = async (id: string, payload: Partial<ISeller>) => {
  const result = await Seller.findByIdAndUpdate({ _id: id }, payload, {
    new: true,
  });

  return result;
};
//---------Delete a Seller Service----------------------------------
const deleteSeller = async (id: string) => {
  const result = await Seller.findByIdAndDelete(id);
  return result;
};

export const SellerService = {
  getAllSellers,
  getSingleSeller,
  deleteSeller,
  updateSeller,
};
