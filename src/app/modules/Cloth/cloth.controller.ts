/* eslint-disable no-undef */
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { ClothServices } from './cloth.service';

const createCloth = catchAsync(async (req, res) => {
          const body = req.body;
          const image = req.file as Express.Multer.File;

          await ClothServices.createCloth(body, image);

          sendResponse(res, {
                    statusCode: httpStatus.CREATED,
                    success: true,
                    message: 'Cloth is created successfully',
          });
});

const getAllClothes = catchAsync(async (req, res) => {
          const result = await ClothServices.getAllClothes();

          sendResponse(res, {
                    statusCode: httpStatus.OK,
                    success: true,
                    message: 'Clothes is retrieved successfully',
                    data: result,
          });
});

const getSingleCloth = catchAsync(async (req, res) => {
          const { clothId } = req.query;

          const result = await ClothServices.getSingleCloth(clothId as string);

          sendResponse(res, {
                    statusCode: httpStatus.OK,
                    success: true,
                    message: 'Cloth is retrieved successfully',
                    data: result,
          });
});

const deleteCloth = catchAsync(async (req, res) => {
          const { id } = req.query;

          await ClothServices.deleteCloth(id as string);

          sendResponse(res, {
                    statusCode: httpStatus.OK,
                    success: true,
                    message: 'Cloth is deleted successfully',
          });
});

const updateCloth = catchAsync(async (req, res) => {
          const body = req.body;
          const image = req.file as Express.Multer.File;

          await ClothServices.updateCloth(body, image);

          sendResponse(res, {
                    statusCode: httpStatus.OK,
                    success: true,
                    message: 'Cloth is updated successfully',
          });
});

export const ClothControllers = {
          createCloth,
          getAllClothes,
          getSingleCloth,
          deleteCloth,
          updateCloth,
};