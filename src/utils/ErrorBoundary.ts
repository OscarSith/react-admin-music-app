import { Component, ReactNode } from 'react';

interface Props {
  children?: ReactNode;
  fallback: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }

  public static getDerivedStateFromError() {
    // console.log('getDerivedStateFromError', error);
    return { hasError: true };
  }

  // componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
  //   console.error('BoundaryError:', error, errorInfo);
  // }

  render(): ReactNode {
    if (this.state.hasError) {
      return this.props.fallback;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
