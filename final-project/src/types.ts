// src/types.ts
export type Product = {

  _id: string;
  name: string;
  description: string
  price: number;
  category: 'men' | 'women';
  image: string;
  material?: string;
};

