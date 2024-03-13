import express from 'express';
import auth from '../../middlewares/auth';
import { USER_ROLE } from './user.constant';
import { UserControllers } from './user.controller';

const router = express.Router();

router.get(
          '/me',
          auth(USER_ROLE.user, USER_ROLE.admin, USER_ROLE.superAdmin, USER_ROLE.developer),
          UserControllers.getMe,
);

export const UserRoutes = router;