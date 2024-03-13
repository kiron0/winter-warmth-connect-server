import { Router } from 'express';
import { AnalyticsRoutes } from '../modules/Analytics/analytics.route';
import { AuthRoutes } from '../modules/Auth/auth.route';
import { ClothRoutes } from '../modules/Cloth/cloth.route';
import { GalleryRoutes } from '../modules/Gallery/gallery.route';
import { UserRoutes } from '../modules/User/user.route';

const router = Router();

const moduleRoutes = [
          {
                    path: '/auth',
                    route: AuthRoutes,
          },
          {
                    path: '/users',
                    route: UserRoutes,
          },
          {
                    path: '/clothes',
                    route: ClothRoutes,
          },
          {
                    path: '/gallery',
                    route: GalleryRoutes,
          },
          {
                    path: '/analytics',
                    route: AnalyticsRoutes,
          }
];


moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;