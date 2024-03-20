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
import { SampleOUs } from "@/data";
import ReviewCard from "@/components/review-card";

export const Route = createFileRoute("/feed/$ouCode")({
  loader: ({ context: { queryClient }, params: { ouCode } }) =>
    queryClient.ensureQueryData(reviewQueryOptions(ouCode)),
  component: FeedRoute,
});

export function FeedRoute() {
  const { ouCode } = Route.useParams();

  const reviews = Route.useLoaderData();
  const ou = SampleOUs.find((ou) => ou.code === ouCode);

  return (
    <div className="w-full h-full justify-center flex flex-col gap-y-3">
      <h1 className="text-3xl text-center">{ou?.name}</h1>
      <Dialog>
        <Button asChild className="w-fit">
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
        {reviews.length === 0 ? (
          <>No reviews yet, post one now!</>
        ) : (
          reviews.map((review) => (
            <ReviewCard
              OUID={review.OUID}
              title={review.title}
              date={review.date}
              downvotes={review.downvotes}
              upvotes={review.upvotes}
              feedback={review.feedback}
              rating={review.rating}
              userId={review.userId}
              key={review.id}
              id={review.id}
            />
          ))
        )}
      </div>
    </div>
  );
}
