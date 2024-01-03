import React from 'react';
import ReactDOM from "react-dom/client";

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min'
import './index.css';
import App from './App';
import { ErrorBoundary } from 'react-error-boundary';

function ErrorFallback({ error, componentStack, resetErrorBoundary }: any) {
  return (
    <div className='ERROR'>
      <h1>F5 or manually REFRESH with the button below</h1>
      <h2>Something goes wrong <u>How do you get here?</u></h2>
      <p>{error.toString()}</p>
      <p>Component stack:</p>
      <pre>{componentStack}</pre>
      <button onClick={resetErrorBoundary}>Refresh</button>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <App />
    </ErrorBoundary>
  </React.StrictMode>
);

