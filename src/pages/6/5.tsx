import { Component, createContext, useContext } from 'react';

interface ErrorBoundaryProps {
  fallback:
    | React.ReactNode
    | ((props: ErrorBoundaryFallbackContextValue) => React.ReactNode);
  children: React.ReactNode;
  onReset?: () => void;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

interface ErrorBoundaryFallbackContextValue {
  error: Error;
  resetErrorBoundary: () => void;
}

const ErrorBoundaryFallbackContext =
  createContext<ErrorBoundaryFallbackContextValue | null>(null);

export function useErrorBoundaryFallback(): ErrorBoundaryFallbackContextValue {
  const context = useContext(ErrorBoundaryFallbackContext);

  if (!context) {
    throw new Error(
      'useErrorBoundaryFallback must be used inside ErrorBoundary fallback UI.',
    );
  }

  return context;
}

export class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
    };
  }

  // 에러 발생 시 상태 업데이트 (렌더링 단계)
  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  // 에러 로깅 등 부수 효과 처리 (커밋 단계)
  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  // 에러 상태 리셋
  resetErrorBoundary = () => {
    this.setState({
      hasError: false,
      error: null,
    });
    this.props.onReset?.();
  };

  render() {
    if (!this.state.hasError) {
      return this.props.children;
    }

    const error =
      this.state.error ??
      new Error('오류 상세 정보를 확인할 수 없습니다. 다시 시도해주세요.');
    const fallback =
      typeof this.props.fallback === 'function'
        ? this.props.fallback({
            error,
            resetErrorBoundary: this.resetErrorBoundary,
          })
        : this.props.fallback;

    return (
      <ErrorBoundaryFallbackContext.Provider
        value={{
          error,
          resetErrorBoundary: this.resetErrorBoundary,
        }}
      >
        {fallback}
      </ErrorBoundaryFallbackContext.Provider>
    );
  }
}
