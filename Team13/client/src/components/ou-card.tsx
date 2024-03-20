import type { OUType } from "@/api/ou";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";

export default function OUCard({ name, code, avg_rating }: OUType) {
  return (
    <Card className="w-56">
      <CardHeader>
        <CardTitle>{name}</CardTitle>
        <CardDescription>{code}</CardDescription>
      </CardHeader>
      <CardContent>Average Rating: {avg_rating} / 5</CardContent>
    </Card>
  );
}
