/* eslint-disable no-console */
import { v2 as cloudinary } from 'cloudinary';
import config from '../../config';

cloudinary.config({
          cloud_name: config.cloudinary_cloud_name,
          api_key: config.cloudinary_api_key,
          api_secret: config.cloudinary_api_secret,
          secure: true,
});

const uploadImages = async (image: string, path: string) => {
          try {
                    const result = await cloudinary.uploader.upload(image, {
                              folder: `winterClothes/${path}`,
                              use_filename: true,
                              unique_filename: false,
                              overwrite: true,
                              invalidate: true,
                              public_id: `${Date.now()}`,
                    });
                    return result;
          } catch (error) {
                    console.log(error);
          }
};

const deleteImages = async (public_id: string) => {
          try {
                    const result = await cloudinary.uploader.destroy(public_id, {
                              invalidate: true,
                    });
                    return result;
          } catch (error) {
                    console.log(error);
          }
};

export const Cloudinary = {
          uploadImages,
          deleteImages,
};