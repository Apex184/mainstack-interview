export enum ProductStatus {
  PUBLISHED = "published",
  UNPUBLISHED = "unpublished",
  BLOCKED = "blocked",
  DELETED = "deleted",
  SOLD = "sold",
}

export interface ProductAttributes {
  id: string;
  name: string;
  description: string;
  quantity: number;
  price: number;
  image?: string;
  ProductStatus: ProductStatus;
  productOwnerId: string;
}
