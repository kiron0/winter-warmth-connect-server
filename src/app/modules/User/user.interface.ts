/* eslint-disable no-unused-vars */
import { Model } from 'mongoose';
import { USER_ROLE } from './user.constant';

export interface TUser {
          _id: string;
          username: string;
          email: string;
          password: string;
          passwordChangedAt?: Date;
          image: string;
          role: 'superAdmin' | 'admin' | 'user' | 'developer';
          status: 'in-progress' | 'blocked';
          isDeleted: boolean;
          createdAt?: Date;
          updatedAt?: Date;
}

export interface UserModel extends Model<TUser> {
          isUserExistsById(id: string): Promise<TUser>;
          isPasswordMatched(
                    plainTextPassword: string,
                    hashedPassword: string,
          ): Promise<boolean>;
          isJWTIssuedBeforePasswordChanged(
                    passwordChangedTimestamp: Date,
                    jwtIssuedTimestamp: number,
          ): boolean;
}

export type TUserRole = keyof typeof USER_ROLE;