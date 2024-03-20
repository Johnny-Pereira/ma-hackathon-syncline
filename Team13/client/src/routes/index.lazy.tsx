import { createLazyFileRoute } from "@tanstack/react-router";
import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "../components/ui/button";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { ChevronDownIcon, ChevronUpIcon } from "@radix-ui/react-icons";

export const Route = createLazyFileRoute("/")({
  component: Index,
});

const sampleReviewData = [
  {
    OUname: "sample OU name",
    date: "3/5/23",
    teamName: "sample team or project name",
    review:
      "sample review text, Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cupiditate ratione ipsam mollitia? Natus eaque earum reiciendis maiores illo explicabo iste obcaecati nisi ex, quos voluptatum corporis facere ullam modi quo.",
    rating: "3.5",
  },
  {
    OUname: "another sample OU name",
    date: "1/2/23",
    teamName: "another sample team or project name",
    review:
      "another sample review text, Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cupiditate ratione ipsam mollitia? Natus eaque earum reiciendis maiores illo explicabo iste obcaecati nisi ex, quos voluptatum corporis facere ullam modi quo.",
    rating: "5",
  },
];

function Index() {
  const { loginWithRedirect } = useAuth0();
  return (
    <div>
      <div className="p-2">
        <p>
          Moody's has implemented an anonymous application that allows staff to
          review team communication/culture and provide recommendations on how
          teams can grow and become more effective without feeling tied to a
          particular idea.{" "}
        </p>
        <p>
          This not only fosters a culture of open communication but also enables
          cross-pollination of ideas between teams and OUs.
        </p>

        <p>
          By embracing anonymity, administration can create active change based
          on feedback and recommendations from their teammates, leading to a
          more dynamic and effective organization.
        </p>

        <div
          className="flex flex-row"
          style={{ width: "75%", marginLeft: "auto", marginRight: "auto" }}
        >
          {sampleReviewData.map((review) => (
            <div className="basis-1/2" style={{ padding: "10px" }}>
              {" "}
              <Card style={{ minHeight: "300px" }}>
                <CardHeader>
                  <CardTitle>
                    <pre>
                      {review.OUname} {"\n"}
                      {review.teamName}
                    </pre>
                  </CardTitle>
                  <CardDescription>
                    <div>{review.date}</div>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-row">
                    <div style={{ padding: "10px" }}>
                      <ThumbDownIcon /> <ThumbUpIcon />
                    </div>
                    <p>{review.review}</p>
                  </div>
                </CardContent>
                <CardFooter>
                  <p>{review.rating}</p>
                </CardFooter>
              </Card>
            </div>
          ))}
        </div>
      </div>
      <>
        <div>
          <p>
            Moody's has implemented an anonymous application that allows staff
            to review team communication/culture and provide recommendations on
            how teams can grow and become more effective without feeling tied to
            a particular idea.{" "}
          </p>
          <p>
            This not only fosters a culture of open communication but also
            enables cross-pollination of ideas between teams and OUs.
          </p>

          <p>
            By embracing anonymity, administration can create active change
            based on feedback and recommendations from their teammates, leading
            to a more dynamic and effective organization.
          </p>
        </div>
        <div className="p-2">
          <div
            className="flex flex-row"
            style={{ width: "75%", marginLeft: "auto", marginRight: "auto" }}
          >
            {sampleReviewData.map((review, i) => (
              <div className="basis-1/2" style={{ padding: "10px" }} key={i}>
                {" "}
                <Card style={{ minHeight: "300px" }}>
                  <CardHeader>
                    <CardTitle>
                      <pre>
                        {review.OUname} {"\n"}
                        {review.teamName}
                      </pre>
                    </CardTitle>
                    <CardDescription>
                      <div>{review.date}</div>
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="min-h-36 flex justify-center items-center">
                    <div className="flex flex-row">
                      <div
                        style={{ padding: "10px" }}
                        className="flex flex-col justify-center"
                      >
                        <ChevronUpIcon className="h-6 w-6" />{" "}
                        <ChevronDownIcon className="h-6 w-6" />
                      </div>
                      <p className="">{review.review}</p>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <p>Rating: {review.rating}/5</p>
                  </CardFooter>
                </Card>
              </div>
            ))}
          </div>
        </div>
        <div style={{ width: "15%", marginLeft: "auto", marginRight: "auto" }}>
          <Button onClick={() => loginWithRedirect()}>Post a review</Button>
        </div>
      </>
    </div>
  );
}
