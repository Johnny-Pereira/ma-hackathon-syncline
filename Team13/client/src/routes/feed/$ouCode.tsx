import { createFileRoute } from "@tanstack/react-router";

import AddReviewForm from "@/components/add-review-form";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { reviewQueryOptions } from "@/api/review";
import { SampleReviews } from "@/data";
import ReviewCard from "@/components/review-card";
/**
 * Query sorting options
 * date (asc/desc)
 * rating (asc/desc)
 * relevancy
 */
// export const Route = createFileRoute("/feed/$ouCode")({
//   component: FeedRoute,
//   validateSearch: feedbackSearchSchema,
// });
export const Route = createFileRoute("/feed/$ouCode")({
  // loader: ({ context: { queryClient }, params: { ouCode } }) =>
  //   queryClient.ensureQueryData(reviewQueryOptions(ouCode)),
  loader: ({ params: { ouCode } }) => {
    return SampleReviews.filter((r) => r.ouCode === ouCode);
  },
  component: FeedRoute,
});

export function FeedRoute() {
  const { ouCode } = Route.useParams();

  const reviews = Route.useLoaderData();

  return (
    <div className="w-full h-full">
      <h1>OU Code ${ouCode}</h1>
      <Dialog>
        <Button asChild>
          <DialogTrigger>Add a review</DialogTrigger>
        </Button>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add a review</DialogTitle>
          </DialogHeader>
          <AddReviewForm />
        </DialogContent>
      </Dialog>

      <div className="space-y-2">
        {reviews.map((review) => (
          <li key={review.id}>
            <ReviewCard
              title={review.title}
              feedback={review.feedback}
              rating={review.rating}
              ouCode={review.ouCode}
              date={review.date}
              id={review.id}
            />
          </li>
        ))}
      </div>
    </div>
  );
}
