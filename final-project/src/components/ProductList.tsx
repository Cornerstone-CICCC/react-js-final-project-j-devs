import { getAllProducts } from "@/app/actions/product.actions";
import ProductCard from './ProductCard';


export default async function ProductList() {
  const products = await getAllProducts();

  return (
    <section className="px-8 py-16 bg-[#f8f9fb] min-h-screen">
      <h2 className="text-3xl font-bold text-center mb-12">Shop Our Collection</h2>
      <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </section>
  );
}
