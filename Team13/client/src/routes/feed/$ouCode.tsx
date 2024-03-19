import { createFileRoute } from "@tanstack/react-router";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import AddReviewForm from "@/components/add-review-form";

export const Route = createFileRoute("/feed/$ouCode")({
  component: FeedRoute,
});

export function FeedRoute() {
  const { ouCode } = Route.useParams();
  return (
    <div>
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
    </div>
  );
}
