import { GeneralStatus } from "@prisma/client";

type RestaurantFeatures = {
  page?: number;
  perPage?: number;
  orderBy?: string;
  searchWord?: string;
  order?: string;
  status?: GeneralStatus;
};
export default RestaurantFeatures;
