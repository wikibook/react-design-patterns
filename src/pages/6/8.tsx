import { ErrorBoundary } from './5';

function ProductPrice({ amount }: { amount: number | null }) {
  if (amount === null) {
    throw new Error('가격 정보가 없습니다.');
  }

  return <strong>{amount.toLocaleString()}원</strong>;
}

export default function ProductCard() {
  return (
    <ErrorBoundary fallback={<div>가격 정보를 표시할 수 없습니다.</div>}>
      <ProductPrice amount={null} />
    </ErrorBoundary>
  );
}
