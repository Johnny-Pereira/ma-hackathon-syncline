import { queryOptions } from "@tanstack/react-query";
import { instance } from ".";

export type OUType = {
  id: number;
  code: string; // shorthand designator i.e. KYC, CRE
  name: string; // official desginator i.e. Know Your Customer
  avg_rating: number;
};

export const fetchOus = async () => {
  const response = await instance.get<OUType[]>("ou").then((r) => r.data);
  return response;
};

export const ouQueryOptions = queryOptions({
  queryKey: ["ous"],
  queryFn: () => fetchOus(),
});
