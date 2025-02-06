import React from 'react';
import { ErrorBoundary as ReactErrorBoundary } from 'react-error-boundary';

const ErrorFallback = () => {
    return <h1>Something went wrong. Please try again later.</h1>;
};

const ErrorBoundary: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <ReactErrorBoundary FallbackComponent={ErrorFallback}>
            {children}
        </ReactErrorBoundary>
    );
};

export default ErrorBoundary; 