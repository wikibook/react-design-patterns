import { BetaFeatureCardWithFlag as Card } from './14';

export default function Page() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Welcome to MyApp</h1>
      <Card />
      {/* 나머지 앱 내용 */}
    </div>
  );
}
