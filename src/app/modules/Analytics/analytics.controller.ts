import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { AnalyticsService } from './analytics.service';

const getAnalytics = catchAsync(async (req, res) => {
          const result = await AnalyticsService.getAnalytics();

          sendResponse(res, {
                    statusCode: httpStatus.CREATED,
                    success: true,
                    message: 'Analytics is registered successfully!',
                    data: result,
          });
});

export const AnalyticsControllers = {
          getAnalytics,
};