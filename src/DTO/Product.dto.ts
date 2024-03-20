export interface ProductStatus {
  ACTIVE: "active";
  INACTIVE: "inactive";
  BLOCKED: "blocked";
  DELETED: "deleted";
  SOLD: "sold";
}

export interface ProductAttributes {
  id: string;
  name: string;
  description: string;
  quantity: number;
  price: number;
  image?: string;
  status?: ProductStatus;
}
