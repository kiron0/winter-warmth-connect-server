/* eslint-disable no-undef */
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { GalleryServices } from './gallery.service';

const createImage = catchAsync(async (req, res) => {
          const image = req.file as Express.Multer.File;

          await GalleryServices.createImage(image);

          sendResponse(res, {
                    statusCode: httpStatus.CREATED,
                    success: true,
                    message: 'Image is created successfully',
          });
});

const getAllImages = catchAsync(async (req, res) => {
          const result = await GalleryServices.getAllImages();

          sendResponse(res, {
                    statusCode: httpStatus.OK,
                    success: true,
                    message: 'Images is retrieved successfully',
                    data: result,
          });
});

const getSingleImage = catchAsync(async (req, res) => {
          const { id } = req.query;

          const result = await GalleryServices.getSingleImage(id as string);

          sendResponse(res, {
                    statusCode: httpStatus.OK,
                    success: true,
                    message: 'Image is retrieved successfully',
                    data: result,
          });
});

const deleteImage = catchAsync(async (req, res) => {
          const { id } = req.query;

          await GalleryServices.deleteImage(id as string);

          sendResponse(res, {
                    statusCode: httpStatus.OK,
                    success: true,
                    message: 'Image is deleted successfully',
          });
});

export const GalleryControllers = {
          createImage,
          getAllImages,
          getSingleImage,
          deleteImage,
};