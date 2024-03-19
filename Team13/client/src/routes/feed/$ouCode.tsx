import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/feed/$ouCode")({
  component: FeedRoute,
});

export function FeedRoute() {
  const { ouCode } = Route.useParams();
  return (
    <div>
      <h1>OU Code ${ouCode}</h1>
    </div>
  );
}
