import type { OUType } from "@/api/ou";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";

export default function OUCard({ name, code, avg_rating }: OUType) {
  return (
    <Card className="w-56">
      <CardHeader>
        <CardTitle>{name}</CardTitle>
      </CardHeader>
      <CardContent>{code}</CardContent>
      <CardFooter>Average Rating: {avg_rating} / 5</CardFooter>
    </Card>
  );
}
