import { useDeferredValue, useMemo, useState } from 'react';

interface Product {
  id: string;
  name: string;
}

const PRODUCTS: Array<Product> = Array.from({ length: 200 }, (_, index) => ({
  id: String(index + 1),
  name: `Product ${index + 1}`,
}));

function ProductCard({ product }: { product: Product }) {
  return <div>{product.name}</div>;
}

function ProductList({ products }: { products: Array<Product> }) {
  const [searchTerm, setSearchTerm] = useState('');
  const deferredSearchTerm = useDeferredValue(searchTerm);

  const filteredProducts = useMemo(() => {
    console.log('필터링 실행:', deferredSearchTerm);
    return products.filter((p) =>
      p.name.toLowerCase().includes(deferredSearchTerm.toLowerCase()),
    );
  }, [products, deferredSearchTerm]);

  const isStale = searchTerm !== deferredSearchTerm;

  return (
    <div>
      <input
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="상품 검색"
      />
      <div className={isStale ? 'opacity-50' : ''}>
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

export default function ProductListPage() {
  return <ProductList products={PRODUCTS} />;
}
