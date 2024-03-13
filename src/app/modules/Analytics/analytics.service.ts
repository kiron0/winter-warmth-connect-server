import { TCloth } from "../Cloth/cloth.interface";
import { Cloth } from "../Cloth/cloth.model";
import { TGallery } from "../Gallery/gallery.interface";
import { Gallery } from "../Gallery/gallery.model";
import { TUser } from "../User/user.interface";
import { User } from "../User/user.model";

const getAnalytics = async () => {
          const clothes = await Cloth.find({}) as TCloth[];
          const percentageClothes = (clothes.length / clothes.length) * 100;

          const users = await User.find({}) as TUser[];
          const percentageUsers = (users.length / users.length) * 100;

          const gallery = await Gallery.find({}) as TGallery[];
          const percentageGallery = (gallery.length / gallery.length) * 100;

          // pie chart data for monthly analytics
          const pieChartData = Array.from({ length: 6 }, (_, i) => {
                    const month = new Date(new Date().setMonth(new Date().getMonth() - i)).toLocaleString('default', { month: 'long' });
                    const totalClothes = clothes.filter((cloth) => new Date(cloth.createdAt as Date).getMonth() === new Date().getMonth() - i).length;
                    const totalUsers = users.filter((user) => new Date(user.createdAt as Date).getMonth() === new Date().getMonth() - i).length;
                    const totalGallery = gallery.filter((image) => new Date(image.createdAt as Date).getMonth() === new Date().getMonth() - i).length;

                    return {
                              month,
                              clothes: totalClothes,
                              users: totalUsers,
                              gallery: totalGallery,
                    };
          });

          const analytics = {
                    clothes: {
                              total: clothes.length,
                              percentage: percentageClothes.toFixed(2),
                    },
                    users: {
                              total: users.length,
                              percentage: percentageUsers.toFixed(2),
                    },
                    gallery: {
                              total: gallery.length,
                              percentage: percentageGallery.toFixed(2),
                    },
                    pieChartData,
          };

          return analytics;
};

export const AnalyticsService = {
          getAnalytics,
};