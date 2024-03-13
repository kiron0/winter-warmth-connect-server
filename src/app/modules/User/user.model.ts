import bcrypt from 'bcrypt';
import { Schema, model } from 'mongoose';
import config from '../../../config';
import { USER_ROLE } from './user.constant';
import { TUser, UserModel } from './user.interface';
import { generateRandomAvatar } from './user.utils';

const userSchema = new Schema<TUser, UserModel>(
          {
                    username: {
                              type: String,
                              required: true,
                    },
                    email: {
                              type: String,
                              required: true,
                              unique: true,
                    },
                    password: {
                              type: String,
                              required: true,
                              select: 0,
                    },
                    passwordChangedAt: {
                              type: Date,
                    },
                    role: {
                              type: String,
                              enum: USER_ROLE,
                              default: 'user',
                    },
                    status: {
                              type: String,
                              enum: ['in-progress', 'blocked'],
                              default: 'in-progress',
                    },
                    image: {
                              type: String,
                              default: function () {
                                        return generateRandomAvatar(this.username.slice(0, 2).toLocaleUpperCase());
                              },
                    },
                    isDeleted: {
                              type: Boolean,
                              default: false,
                    },
          },
          {
                    timestamps: true,
                    versionKey: false,
          },
);

userSchema.pre('save', async function (next) {
          // eslint-disable-next-line @typescript-eslint/no-this-alias
          const user = this;
          user.password = await bcrypt.hash(
                    user.password,
                    Number(config.bcrypt_salt_rounds),
          );

          next();
});

userSchema.post('save', function (doc, next) {
          doc.password = '';

          next();
});

userSchema.post('save', function (doc, next) {
          const user = doc;

          if (user.role !== 'user') {
                    user.role = 'user';
          }

          next();
});

userSchema.statics.isUserExistsById = async function (id: string) {
          return await User.findById(id).select('+password');
};

userSchema.statics.isPasswordMatched = async function (
          plainTextPassword: string,
          hashedPassword: string,
) {
          return await bcrypt.compare(plainTextPassword, hashedPassword);
};

userSchema.statics.isJWTIssuedBeforePasswordChanged = function (
          passwordChangedTimestamp: Date,
          jwtIssuedTimestamp: number,
) {
          const passwordChangedTime =
                    new Date(passwordChangedTimestamp).getTime() / 1000;
          return passwordChangedTime > jwtIssuedTimestamp;
};

export const User = model<TUser, UserModel>('User', userSchema);