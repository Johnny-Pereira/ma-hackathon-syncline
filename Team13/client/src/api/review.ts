import { queryOptions } from "@tanstack/react-query";
import { instance } from ".";

export type ReviewType = {
  id: number;
  title: string;
  feedback: string;
  rating: number;
  ouCode: string;
  date: string;
};

export const fetchReviews = async (ouCode: string) => {
  return instance.get<ReviewType[]>(`reviews/${ouCode}`).then((r) => r.data);
};

export const reviewQueryOptions = (ouCode: string) =>
  queryOptions({
    queryKey: ["reviews", { ouCode }],
    queryFn: () => fetchReviews(ouCode),
  });
