import { Schema, model } from 'mongoose';
import { TGallery } from './gallery.interface';

const gallerySchema = new Schema<TGallery>(
          {
                    image: {
                              url: {
                                        type: String,
                                        required: true,
                              },
                              publicId: {
                                        type: String,
                                        required: true,
                              },
                    },
          },
          {
                    timestamps: true,
                    versionKey: false,
          },
);

export const Gallery = model<TGallery>('Gallery', gallerySchema);