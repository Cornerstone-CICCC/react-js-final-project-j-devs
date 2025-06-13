import { notFound } from 'next/navigation';
import { getProductById } from '@/app/actions/product.actions'; // Adjust path as needed
import ProductClient from '@/components/ProductClient';

export default async function ProductPage({ params }: { params: { id: string } }) {
  const product = await getProductById(params.id);

  if (!product) return notFound();

  return <ProductClient product={product} />;
}
