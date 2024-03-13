import httpStatus from 'http-status';
import config from '../../../config';
import AppError from '../../errors/AppError';
import { TUser } from '../User/user.interface';
import { User } from '../User/user.model';
import { TLoginUser, TRegisterUser } from './auth.interface';
import { createToken, verifyToken } from './auth.utils';

const registerUser = async (payload: TRegisterUser) => {
          const user = await User.findOne({ email: payload.email }) as TUser;

          if (user) {
                    throw new AppError(httpStatus.BAD_REQUEST, 'This user is already exists !');
          }

          const newUser = await User.create(payload);

          return newUser;
};

const loginUser = async (payload: TLoginUser) => {
          const user = await User.findOne({ email: payload.email }).select('+password') as TUser;

          if (!user) {
                    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !');
          }

          const isDeleted = user?.isDeleted;

          if (isDeleted) {
                    throw new AppError(httpStatus.FORBIDDEN, 'This user is deleted !');
          }

          const isPasswordMatched = await User.isPasswordMatched(payload?.password, user?.password);

          if (!isPasswordMatched)
                    throw new AppError(httpStatus.FORBIDDEN, 'Password do not matched');

          const jwtPayload = {
                    userId: user._id,
                    role: user.role,
          };

          const accessToken = createToken(
                    jwtPayload,
                    config.jwt_access_secret as string,
                    config.jwt_access_expires_in as string,
          );

          const refreshToken = createToken(
                    jwtPayload,
                    config.jwt_refresh_secret as string,
                    config.jwt_refresh_expires_in as string,
          );

          return {
                    accessToken,
                    refreshToken,
          };
};

const refreshToken = async (token: string) => {
          const decoded = verifyToken(token, config.jwt_refresh_secret as string);

          const { userId, iat } = decoded;

          const user = await User.isUserExistsById(userId) as TUser;

          if (!user) {
                    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !');
          }

          const isDeleted = user?.isDeleted;

          if (isDeleted) {
                    throw new AppError(httpStatus.FORBIDDEN, 'This user is deleted !');
          }

          const userStatus = user?.status;

          if (userStatus === 'blocked') {
                    throw new AppError(httpStatus.FORBIDDEN, 'This user is blocked ! !');
          }

          if (
                    user.passwordChangedAt &&
                    User.isJWTIssuedBeforePasswordChanged(user.passwordChangedAt, iat as number)
          ) {
                    throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized !');
          }

          const jwtPayload = {
                    userId: user._id,
                    role: user.role,
          };

          const accessToken = createToken(
                    jwtPayload,
                    config.jwt_access_secret as string,
                    config.jwt_access_expires_in as string,
          );

          return {
                    accessToken,
          };
};


export const AuthServices = {
          registerUser,
          loginUser,
          refreshToken,
};