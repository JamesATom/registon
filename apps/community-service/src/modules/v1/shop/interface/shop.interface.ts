// shop.interface.ts

export interface ShopCategory {
  id: string;
  title: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
  updatedBy: string;
}

export interface ShopProduct {
  id: string;
  title: string;
  description: string;
  image: string;
  points: number;
  quantity: number;
  shopCategoryId: string;
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
  updatedBy: string;
}

export interface ShopOrder {
  id: string;
  product: string; // UUID of shopProduct
  student: string; // UUID of user/student
  status: 'READY' | 'ACCEPTED' | 'SENT' | 'FINISHED';
  points: number;
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
  updatedBy: string;
}

export type CreateShopCategoryDto = Omit<ShopCategory, 'id' | 'createdAt' | 'updatedAt'>;
export type UpdateShopCategoryDto = Partial<Omit<ShopCategory, 'id' | 'createdAt' | 'updatedAt'>>;

export type CreateShopProductDto = Omit<ShopProduct, 'id' | 'createdAt' | 'updatedAt'>;
export type UpdateShopProductDto = Partial<Omit<ShopProduct, 'id' | 'createdAt' | 'updatedAt'>>;

export type CreateShopOrderDto = Omit<ShopOrder, 'id' | 'createdAt' | 'updatedAt'>;
export type UpdateShopOrderDto = Partial<Omit<ShopOrder, 'id' | 'createdAt' | 'updatedAt'>>;
