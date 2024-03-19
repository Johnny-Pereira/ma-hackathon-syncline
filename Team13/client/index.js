import React from 'react';
import { createRoot } from 'react-dom/client';
import { Auth0Provider } from '@auth0/auth0-react';
import App from './App';

const root = createRoot(document.getElementById('root'));

//Auth0 (Okta) config information 
root.render(
<Auth0Provider
    domain="dev-obx4reobb48jww42.us.auth0.com"
    clientId="GteWklsK0b06Za4xELKTsnN5TrcWRywC"
    authorizationParams={{
      redirect_uri: window.location.origin
    }}
  >
    <App />
  </Auth0Provider>,
);
