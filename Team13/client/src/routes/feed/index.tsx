import { ouQueryOptions } from "@/api/ou";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { Link, Outlet } from "@tanstack/react-router";
import { SampleOUs } from "@/data";
import OUCard from "@/components/ou-card";

export const Route = createFileRoute("/feed/")({
  // loader: ({ context: { queryClient } }) =>
  //   queryClient.ensureQueryData(ouQueryOptions),
  component: FeedComponent,
});

function FeedComponent() {
  // const { data, isLoading, isError } = useQuery(ouQueryOptions);

  // if (isLoading) {
  //   return <>Loading...</>;
  // }

  // if (isError || !data) {
  //   return <>Error fetching data.</>;
  // }

  return (
    <div className="p-2 flex gap-2 flex-col w-full h-full flex justify-center">
      <h1 className="text-3xl text-center">Moody's Blind</h1>
      <ul className="flex flex-wrap gap-x-3">
        {SampleOUs.map((ou) => (
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
                avg_rating={ou.avg_rating}
              />
            </Link>
          </li>
        ))}
      </ul>
      <Outlet />
    </div>
  );
}
