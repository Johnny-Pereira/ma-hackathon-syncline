import { ouQueryOptions } from "@/api/ou";
import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { SampleOUs } from "@/data";
import OUCard from "@/components/ou-card";

export const Route = createFileRoute("/feed/")({
  loader: ({ context: { queryClient } }) =>
    queryClient.ensureQueryData(ouQueryOptions),
  // loader: () => SampleOUs,
  component: FeedComponent,
});

function FeedComponent() {
  const data = Route.useLoaderData();
  console.log(data);

  return (
    <div className="p-2 flex gap-2 flex-col w-full h-full flex justify-center">
      <h1 className="text-3xl text-center font-extrabold font-america">
        MOODYS<span className="font-thin">BLIND</span>
      </h1>
      <ul className="flex flex-wrap gap-x-3 justify-center">
        {data.map((ou) => (
          <li key={ou.id}>
            <Link
              to="/feed/$ouCode"
              params={{ ouCode: ou.code }}
              className="block py-3"
            >
              <OUCard
                id={ou.id}
                name={ou.name}
                code={ou.code}
                ou_rating={ou.ou_rating}
              />
            </Link>
          </li>
        ))}
      </ul>
      {/* <Outlet /> */}
    </div>
  );
}
