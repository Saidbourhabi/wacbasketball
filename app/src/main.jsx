import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Auth0Provider } from '@auth0/auth0-react';
import { HelmetProvider } from 'react-helmet-async';
import { Toaster } from 'react-hot-toast';
import { Analytics } from "@vercel/analytics/react"
import './i18n/i18n.js';
import './styles/index.css';
import App from './App.jsx';

const onRedirectCallback = (appState) => {
  window.history.replaceState(
    {},
    document.title,
    appState?.returnTo || window.location.pathname
  );
};

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <HelmetProvider>
        <Auth0Provider
          domain={import.meta.env.VITE_AUTH0_DOMAIN}
          clientId={import.meta.env.VITE_AUTH0_CLIENT_ID}
          authorizationParams={{
            redirect_uri: window.location.origin,
            scope: 'openid profile email offline_access',
            // audience: import.meta.env.VITE_AUTH0_AUDIENCE, // uncomment if you have an API
          }}
          cacheLocation="memory"
          useRefreshTokens
          useRefreshTokensFallback={false}
          onRedirectCallback={onRedirectCallback}
        >
          <App />
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: '#111',
                color: '#fff',
                border: '1px solid #fc0000',
                fontSize: '14px',
              },
              success: { iconTheme: { primary: '#16a34a', secondary: '#fff' } },
              error:   { iconTheme: { primary: '#fc0000', secondary: '#fff' } },
            }}
          />
        </Auth0Provider>
      </HelmetProvider>
      <Analytics/>
    </BrowserRouter>
  </StrictMode>
);