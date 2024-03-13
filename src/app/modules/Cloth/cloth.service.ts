/* eslint-disable no-undef */
import { Cloudinary } from '../../utils/cloudinary';
import { TCloth } from './cloth.interface';
import { Cloth } from './cloth.model';

const createCloth = async (cloth: TCloth, image: Express.Multer.File) => {
          const { title, description, category, size } = cloth;

          if (!title || !description || !category || !size || !image) {
                    throw new Error('All fields are required');
          }

          const isExist = await Cloth.findOne({ title, category });

          if (isExist) {
                    throw new Error('Cloth already exists');
          }

          const parsedSizes = JSON.parse(size as unknown as string);

          const uploadImage = await Cloudinary.uploadImages(image.path, 'clothes');

          const url = uploadImage?.secure_url;
          const publicId = uploadImage?.public_id;

          const finalData = {
                    ...cloth,
                    image: {
                              url,
                              publicId,
                    },
                    size: parsedSizes,
          } as TCloth;

          const newCloth = await Cloth.create(finalData);

          return newCloth;
};

const getAllClothes = async () => {
          const result = await Cloth.find().sort({ createdAt: -1 });

          if (result.length === 0) {
                    throw new Error('Clothes not found');
          }

          return result;
};

const getSingleCloth = async (clothId: string) => {
          const result = await Cloth.findById(clothId);

          if (!result) {
                    throw new Error('Cloth not found');
          }

          return result;
};

const deleteCloth = async (clothId: string) => {
          if (!clothId) {
                    throw new Error('Cloth ID is required');
          }

          const isExist = await Cloth.findById(clothId) as TCloth;

          if (!isExist) {
                    throw new Error('Cloth not found');
          }

          await Cloudinary.deleteImages(isExist.image.publicId);

          const result = await Cloth.findByIdAndDelete(clothId);

          return result;
}

const updateCloth = async (cloth: TCloth, image: Express.Multer.File) => {
          const { _id, size, ...rest } = cloth;

          const isExist = await Cloth.findById(_id) as TCloth;

          if (!isExist) {
                    throw new Error('Cloth not found');
          }

          const parsedSizes = JSON.parse(size as unknown as string);

          if (image) {
                    await Cloudinary.deleteImages(isExist.image.publicId);

                    const uploadImage = await Cloudinary.uploadImages(image.path, 'clothes');

                    const url = uploadImage?.secure_url;
                    const publicId = uploadImage?.public_id;

                    const result = await Cloth.findByIdAndUpdate(_id, {
                              ...rest,
                              image: {
                                        url,
                                        publicId,
                              },
                              size: parsedSizes,
                    });

                    return result;
          }

          const result = await Cloth.findByIdAndUpdate(_id, {
                    ...rest,
                    size: parsedSizes,
                    image: isExist.image,
          });

          return result;
}

export const ClothServices = {
          createCloth,
          getAllClothes,
          getSingleCloth,
          deleteCloth,
          updateCloth,
};