import express from 'express';
import { upload } from '../../utils/upload';
import { GalleryControllers } from './gallery.controller';

const router = express.Router();

router.post(
          '/create',
          upload.single("image"),
          GalleryControllers.createImage,
);

router.get(
          '/all',
          GalleryControllers.getAllImages,
);

router.get(
          '/single',
          GalleryControllers.getSingleImage,
);

router.delete(
          '/delete',
          GalleryControllers.deleteImage,
);

export const GalleryRoutes = router;