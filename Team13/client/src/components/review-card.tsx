import { ReviewType } from "@/api/review";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { ChevronDownIcon, ChevronUpIcon } from "@radix-ui/react-icons";

export default function ReviewCard({
  OUID,
  date,
  downvotes,
  upvotes,
  feedback,
  rating,
  title,
}: ReviewType) {
  return (
    <Card className="h-52">
      <CardHeader>
        {/* title and 3 dots */}
        <CardTitle className="flex space-x-2">
          <h1>{title} - </h1>
          <p className="text-gray-400">{date}</p>
        </CardTitle>
        <CardDescription>{OUID}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-x-4">
          <span className="flex flex-col items-center">
            <ChevronUpIcon />
            {upvotes - downvotes}
            <ChevronDownIcon />
          </span>
          <p>{feedback}</p>
        </div>
        {/* arrow */}
      </CardContent>
      <CardFooter>Rating: {rating}</CardFooter>
    </Card>
  );
}
