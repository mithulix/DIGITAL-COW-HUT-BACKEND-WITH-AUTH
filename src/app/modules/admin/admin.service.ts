/* eslint-disable @typescript-eslint/no-unused-vars */
import config from '../../../config/envConfig';
import { IAdmin } from './admin.interface';
import { Admin } from './admin.model';
import { generateAdminId } from './admin.utils';

//------- get all admin users -------------------------
const getAllAdmins = async () => {
  const result = await Admin.find({});
  return result;
};

//------- get single admin -------------------------
const getSingleAdmin = async (id: string) => {
  const result = await Admin.findById(id);
  return result;
};

//------- update a admin ------------------------------
const updateAdmin = async (id: string, payload: Partial<IAdmin>) => {
  const result = await Admin.findByIdAndUpdate({ _id: id }, payload, {
    new: true,
  });

  return result;
};

//------- delete a admin -----------------------------
const deleteAdmin = async (id: string) => {
  const result = await Admin.findByIdAndDelete(id);
  return result;
};

//------- create a admin ---------------------------
const createAdmin = async (admin: IAdmin) => {
  if (!admin.password) {
    admin.password = config.default_user_pass as string;
  }
  const id = await generateAdminId();
  admin.id = id;

  const createdAdmin = await Admin.create(admin);
  const { password, ...result } = createdAdmin.toObject();
  return result;
};

export const AdminService = {
  getAllAdmins,
  getSingleAdmin,
  deleteAdmin,
  updateAdmin,
  createAdmin,
};
