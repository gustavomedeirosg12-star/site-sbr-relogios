import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null
    };
  }

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-dark-900 text-white flex flex-col items-center justify-center p-4">
          <div className="bg-red-500/10 border border-red-500/20 p-6 rounded-sm max-w-2xl w-full">
            <h1 className="text-xl font-bold text-red-500 mb-4">Ops! Ocorreu um erro inesperado.</h1>
            <pre className="bg-dark-900 p-4 rounded-sm overflow-x-auto text-sm text-red-400 border border-white/5 whitespace-pre-wrap">
              {this.state.error?.message}
              {'\n\n'}
              {this.state.error?.stack}
            </pre>
            <button 
              onClick={() => window.location.reload()}
              className="mt-6 bg-white text-dark-900 px-4 py-2 rounded-sm font-medium hover:bg-gray-200 transition-colors"
            >
              Recarregar página
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
