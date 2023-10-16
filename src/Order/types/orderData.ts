import { Decimal } from "@prisma/client/runtime/library";

type orderData = {
  user: {
    email?: string;
  };
  id?: string;
  createdAt?: Date;
  phoneNumber?: string;
  location?: string;
  notes?: string;
  items?: {
    quantity?: Decimal;
    meal?: {
      name?: string;
      price?: Decimal;
    };
  }[];
  totalPrice?: Decimal;
};

export default orderData;
