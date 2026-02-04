import React, { useEffect, useState } from "react";
import { fetchProducts } from "../services/api";
import ProductCard, { Product } from "../components/ProductCard";

const Products: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    fetchProducts(12)
      .then((data) => {
        if (mounted && data?.products) {
          const prods = data.products as Product[];
          // mark top 25% by rating as bestsellers
          const ratings = prods.map((p) => p.rating ?? 0).sort((a, b) => b - a);
          const cutoffIndex = Math.max(
            0,
            Math.floor(ratings.length * 0.25) - 1,
          );
          const threshold = ratings[cutoffIndex] ?? 0;
          const productsWithBadge = prods.map((p) => ({
            ...p,
            isBestseller: (p.rating ?? 0) >= threshold,
          }));
          setProducts(productsWithBadge as Product[]);
        }
      })
      .catch((err) => {
        if (mounted) setError(err?.message ?? "خطا در دریافت محصولات");
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });
    return () => {
      mounted = false;
    };
  }, []);

  if (loading)
    return <div className="text-center py-12">در حال بارگذاری محصولات...</div>;
  if (error) return <div className="text-center py-12">خطا: {error}</div>;

  return (
    <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4 md:gap-5 lg:gap-6">
      {products.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  );
};

export default Products;
