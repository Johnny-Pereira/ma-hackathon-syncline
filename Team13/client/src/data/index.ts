import type { OUType } from "@/api/ou";
import type { ReviewType } from "@/api/review";

export const SampleReviews: ReviewType[] = [
  {
    id: "123",
    title: "KYC NPI",
    feedback: "This is a great OU, I love it!",
    rating: 4.3,
    ouCode: "KYC",
    date: "3/4/2023",
  },
  {
    id: "asd",
    title: "CRE",
    feedback: "I think this OU is okay, but it could be better",
    rating: 4.2,
    ouCode: "CRE",
    date: "3/4/2024",
  },
  {
    id: "ads;jkfa;",
    title: "CPG",
    feedback: "I like the initiatives with gen AI and I think this new pla",
    rating: 4.3,
    ouCode: "CPG",
    date: "3/4/2023",
  },
  {
    id: "ad,ja;",
    title: "Structured finance",
    feedback: "My team is incredibly helpful and supportive",
    rating: 4.3,
    ouCode: "SF",
    date: "3/4/2023",
  },
];

export const SampleOUs: OUType[] = [
  {
    id: "123",
    code: "KYC",
    name: "Know Your Customer",
    avg_rating: 4.5,
  },
  {
    id: "456",
    code: "CRE",
    name: "Commercial Real Estate",
    avg_rating: 4.8,
  },
  {
    id: "789",
    code: "BANK",
    name: "Banking",
    avg_rating: 4.5,
  },
  {
    id: "130",
    code: "CPG",
    name: "Central Product Group",
    avg_rating: 5,
  },
  {
    id: "184",
    code: "DI",
    name: "Digital Insights",
    avg_rating: 4.2,
  },
  {
    id: "018",
    code: "DS",
    name: "Data Solutions",
    avg_rating: 4.5,
  },
  {
    id: "1AJNV",
    code: "IP",
    name: "Insurance & Pensions",
    avg_rating: 4.5,
  },
  {
    id: "aasksd",
    code: "SF",
    name: "Structured Finance",
    avg_rating: 4.5,
  },
  {
    id: "aksjk",
    code: "PA",
    name: "Predictive Analytics",
    avg_rating: 4.9,
  },
];
