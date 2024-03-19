import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/feed/$ouCode")({
  component: OUFeed,
});

function OUFeed() {
  const { ouCode } = Route.useParams();
  return <div>OU {ouCode}</div>;
}
