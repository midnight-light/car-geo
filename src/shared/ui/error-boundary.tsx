import React, { Suspense } from 'react';

interface Props {
  children: React.ReactNode;
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

class ErrorBoundary extends React.Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
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
