import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { UserServices } from './user.service';

const getMe = catchAsync(async (req, res) => {
          const { userId } = req.body.user;
          const result = await UserServices.getMe(userId);

          sendResponse(res, {
                    statusCode: httpStatus.OK,
                    success: true,
                    message: 'User is retrieved successfully',
                    data: result,
          });
});

export const UserControllers = {
          getMe,
};