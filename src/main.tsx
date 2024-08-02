import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { inject as injectAnalytics } from '@vercel/analytics';
import { injectSpeedInsights } from '@vercel/speed-insights';
 

import { App } from './app/app';

injectAnalytics();
injectSpeedInsights();
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
