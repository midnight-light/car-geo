import React, { Component, ErrorInfo, ReactNode, Suspense } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

const ErrorFallback = () => (
  <div>
    <h2>Что-то пошло не так.</h2>
    <p>Мы уже работаем над решением проблемы. Пожалуйста, перезагрузите страницу.</p>
  </div>
);

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <Suspense fallback="">
          <ErrorFallback />
        </Suspense>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;