import { queryOptions } from "@tanstack/react-query";
import { instance } from ".";

export type ReviewType = {
  OUID: string;
  date: string;
  downvotes: number;
  upvotes: number;
  feedback: string;
  id: number;
  rating: number;
  title: string;
  userId: string;
};

export const fetchReviews = async (ouCode: string) => {
  const data = await instance
    .get<ReviewType[]>("reviews")
    .then((r) => r.data)
    .catch((err) => console.error(err));
  if (!data) {
    return [];
  }
  const reviews = data.filter((review) => review.OUID === ouCode);
  return reviews;
};

export const reviewQueryOptions = (ouCode: string) =>
  queryOptions({
    queryKey: ["reviews"],
    queryFn: () => fetchReviews(ouCode),
  });

export type AddReviewData = {
  OUID: string;
  userId: string;
  title: string;
  feedback: string;
  rating: number;
};

export const addReview = async (data: AddReviewData) => {
  const response = await instance.post("reviews", {
    ...data,
  });
  return response;
};
