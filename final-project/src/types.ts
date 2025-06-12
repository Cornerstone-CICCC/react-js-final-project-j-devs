// src/types.ts
export type Product = {
  id: string
  name: string
  price: number
  category: 'men' | 'women'
  image: string
}


export type Category = Product['category']
