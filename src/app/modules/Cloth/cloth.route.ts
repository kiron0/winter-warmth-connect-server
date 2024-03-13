import express from 'express';
import { upload } from '../../utils/upload';
import { ClothControllers } from './cloth.controller';

const router = express.Router();

router.post(
          '/create',
          upload.single("image"),
          ClothControllers.createCloth,
);

router.get(
          '/all',
          ClothControllers.getAllClothes,
);

router.get(
          '/single',
          ClothControllers.getSingleCloth,
);

router.delete(
          '/delete',
          ClothControllers.deleteCloth,
);

router.put(
          '/update',
          upload.single("image"),
          ClothControllers.updateCloth,
);

export const ClothRoutes = router;