import { notFound } from 'next/navigation';
import { products } from '@/lib/data';
import { Product } from '@/types';
import ProductClient from '@/components/ProductClient';

export default function ProductPage({ params }: { params: { id: string } }) {
  const product: Product | undefined = products.find((p) => p.id === params.id);
  if (!product) return notFound();

  const descriptionMap: Record<string, { description: string; material: string }> = {
    'Cropped Jacket': {
      description: 'Stay stylish and warm with this cropped jacket, perfect for cool evenings and casual outings.',
      material: '65% polyester, 35% cotton',
    },
    'Oversized Hoodie': {
      description: 'Cozy and roomy, this oversized hoodie is ideal for lounging or layering in streetwear fashion.',
      material: '100% organic cotton',
    },
    'Denim Skirt': {
      description: 'Classic high-waisted denim skirt with a modern cut, great for a vintage-inspired outfit.',
      material: '98% cotton, 2% elastane',
    },
    'Black Cargo Pants': {
      description: 'Functional cargo pants with a modern fit and multiple pockets for utility and style.',
      material: '100% nylon',
    },
    'Urban T-Shirt': {
      description: 'Minimalist t-shirt featuring a soft fit and trendy graphic for an urban look.',
      material: '100% cotton',
    },
    'Bomber Jacket': {
      description: 'Bold varsity-inspired bomber jacket that adds attitude to any outfit.',
      material: '50% wool, 50% polyester',
    },
    'Slim Fit Jeans': {
      description: 'Stretchy slim fit jeans designed for comfort and everyday wear.',
      material: '99% cotton, 1% elastane',
    },
    'Logo Hoodie': {
      description: 'Branded hoodie with signature logo print, made to elevate your casual wardrobe.',
      material: '80% cotton, 20% recycled polyester',
    },
    'Short-Sleeve Shirt': {
      description: 'Breathable short-sleeve shirt perfect for warm days and smart-casual occasions.',
      material: '70% rayon, 30% linen',
    },
  };

  const { description, material } = descriptionMap[product.name] || {
    description: 'No description available.',
    material: 'Material not specified.',
  };

  return <ProductClient product={product} description={description} material={material} />;
}
