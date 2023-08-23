import { User } from './user.model';

export const isUserAvailable = async (id: string): Promise<boolean> => {
  const user = await User.findById(id);
  return !!user;
};
