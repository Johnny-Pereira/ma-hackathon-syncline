import { createLazyFileRoute } from "@tanstack/react-router";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"


export const Route = createLazyFileRoute("/")({
  component: Index,
});

const sampleReviewData = [{ 'OUname': "sample OU name", 'date': '3/5/23', 'teamName': 'sample team or project name', 'review': 'sample review text', 'rating': '3.5' }, { 'OUname': "another sample OU name", 'date': '1/2/23', 'teamName': 'another sample team or project name', 'review': 'another sample review text', 'rating': '5' }]

function Index() {
  return (
    <div className="p-2">
      <h3>Welcome Home!</h3>
      <p>Moody's has implemented an anonymous application that allows staff to review team communication/culture and provide recommendations on how teams can grow and become more effective without feeling tied to a particular idea. This not only fosters a culture of open communication but also enables cross-pollination of ideas between teams and OUs.
        By embracing anonymity, administration can create active change based on feedback and recommendations from their teammates, leading to a more dynamic and effective organization.</p>



      <div className="flex flex-row" style={{ width: "75%", marginLeft: "auto", marginRight: "auto" }}>
        {sampleReviewData.map((review) => (<div className="basis-1/2">  <Card>
          <CardHeader>
            <CardTitle>
              <pre>
                {review.OUname} {"\n"}
                {review.teamName}
              </pre>

            </CardTitle>
            <CardDescription>{review.date}</CardDescription>
          </CardHeader>
          <CardContent>
            <p>{review.review}</p>
          </CardContent>
          <CardFooter>
            <p>{review.rating}</p>
          </CardFooter>
        </Card></div>))
        }
      </div>






    </div>
  );
}
