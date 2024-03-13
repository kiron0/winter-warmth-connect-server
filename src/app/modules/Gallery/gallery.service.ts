/* eslint-disable no-undef */
import { Cloudinary } from '../../utils/cloudinary';
import { TGallery } from './gallery.interface';
import { Gallery } from './gallery.model';

const createImage = async (fileImage: Express.Multer.File) => {
          const uploadImage = await Cloudinary.uploadImages(fileImage.path, 'gallery');

          const url = uploadImage?.secure_url;
          const publicId = uploadImage?.public_id;

          const finalData = {
                    image: {
                              url,
                              publicId,
                    },
          } as TGallery;

          const result = await Gallery.create(finalData);

          return result;
};

const getAllImages = async () => {
          const result = await Gallery.find().sort({ createdAt: -1 });

          if (result.length === 0) {
                    throw new Error('Image not found');
          }

          return result;
};

const getSingleImage = async (id: string) => {
          const result = await Gallery.findById(id);

          if (!result) {
                    throw new Error('Image not found');
          }

          return result;
};

const deleteImage = async (id: string) => {
          if (!id) {
                    throw new Error('ID is required');
          }

          const isExist = await Gallery.findById(id) as TGallery;

          if (!isExist) {
                    throw new Error('Image not found');
          }

          await Cloudinary.deleteImages(isExist.image.publicId);

          const result = await Gallery.findByIdAndDelete(id);

          return result;
}

export const GalleryServices = {
          createImage,
          getAllImages,
          getSingleImage,
          deleteImage,
};