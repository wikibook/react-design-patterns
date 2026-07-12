import type { ComponentType } from 'react';

function withFeatureFlag<P extends object>(Component: ComponentType<P>) {
  return function WrappedComponent(props: P) {
    const isEnabled = import.meta.env.ENABLE_BETA_FEATURE === 'true';

    if (!isEnabled) return null;

    return <Component {...props} />;
  };
}

function BetaFeatureCard() {
  return (
    <div className="p-4 border rounded-lg shadow-md">
      <h3 className="font-semibold">Beta Feature</h3>
      <p>새로운 기능을 시험적으로 제공합니다.</p>
    </div>
  );
}

export const BetaFeatureCardWithFlag = withFeatureFlag(BetaFeatureCard);
