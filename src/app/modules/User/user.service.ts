import { User } from './user.model';

const getMe = async (userId: string) => {
          const user = await User.findById(userId).select('-_id -password -isDeleted -status -createdAt -updatedAt').lean().exec();

          return user;
};

export const UserServices = {
          getMe,
};