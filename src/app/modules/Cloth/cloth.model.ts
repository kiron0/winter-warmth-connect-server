import { Schema, model } from 'mongoose';
import { TCloth } from './cloth.interface';

const clothSchema = new Schema<TCloth>(
          {
                    title: {
                              type: String,
                              required: true,
                    },
                    description: {
                              type: String,
                              required: true,
                    },
                    category: {
                              type: String,
                              required: true,
                    },
                    size: {
                              type: [String],
                              required: true,
                    },
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

export const Cloth = model<TCloth>('Cloth', clothSchema);