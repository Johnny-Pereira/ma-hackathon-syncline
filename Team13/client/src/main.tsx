import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createRouter } from "@tanstack/react-router";

// Import the generated route tree
import { routeTree } from "./routeTree.gen";
import { Auth0Provider } from "@auth0/auth0-react";

// Create a new router instance
const router = createRouter({ routeTree });

// Register the router instance for type safety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

// Render the app
const rootElement = document.getElementById("app")!;
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <StrictMode>
      <Auth0Provider
        domain="dev-obx4reobb48jww42.us.auth0.com"
        clientId="GteWklsK0b06Za4xELKTsnN5TrcWRywC"
        authorizationParams={{
          redirect_uri: "http://localhost:5173/feed",
        }}
      >
        <RouterProvider router={router} />
      </Auth0Provider>
    </StrictMode>
  );
}
