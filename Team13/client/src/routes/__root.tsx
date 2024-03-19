import { QueryClient } from "@tanstack/react-query";
import { Outlet, createRootRouteWithContext } from "@tanstack/react-router";
import Header from "../components/header";

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient;
}>()({ component: RootComponent });

function RootComponent() {
  return (
    <div>
      <Header />
      <Outlet />
    </div>
  );
}
