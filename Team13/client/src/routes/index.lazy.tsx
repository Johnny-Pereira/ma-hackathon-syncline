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
} from "@/components/ui/card"
import { ChevronDownIcon, ChevronUpIcon } from '@radix-ui/react-icons';


export const Route = createLazyFileRoute("/")({
  component: Index,
});



const sampleReviewData = [
  {
  'OUname': "Data Solutions", 
  'date': '1/2/23', 
  'teamName': 'Team Fantastic', 
  'review': 'The Data Solutions OU has been a key driver of data-driven innovation within the organization. Their advanced data modeling and predictive analytics capabilities have provided valuable insights for improving operational efficiency and customer experience.', 
  'rating': '5' 
  },
  { 
    'OUname': "Digital Insights", 
    'date': '3/5/23', 
    'teamName': 'Team Awesome', 
    'review': 'The Digital Insights OU has consistently delivered cutting-edge analytics and insights, driving strategic decision-making across the organization. Their expertise in data analysis and visualization has been instrumental in identifying new opportunities and optimizing business processes.', 
    'rating': '5' 
  }, 
  { 
    'OUname': "Structured Finance", 
    'date': '2/3/23', 
    'teamName': 'Team Superb', 
    'review': 'The Structured Finance OU has played a crucial role in the success of complex financial transactions and deals. Their expertise in structuring financial products and managing risk has been pivotal in driving the organization\'s growth.', 
    'rating': '5'
  }
];

function Index() {
  const { loginWithRedirect } = useAuth0();
  return (
    <>


<div className="max-w-4xl mt-4 mb-4 mx-auto">
  <h2 className="text-2xl font-extrabold font-america">
    MOODYS<span className="font-thin">BLIND</span> 
  </h2>
  <hr className="mt-2 mb-2"></hr>
  <div className="mt-2">
    <p>
      Moody's has implemented an anonymous application that allows staff to review team communication and culture, providing recommendations on how teams can grow and become more effective without feeling tied to a particular idea.
    </p>
    <p>
      This initiative not only fosters a culture of open communication but also enables cross-pollination of ideas between teams and organizational units (OUs).
    </p>
    <br></br>
    <p>
      By embracing anonymity, administration can proactively drive change based on feedback and recommendations from their teammates, leading to a more dynamic and effective organization.
    </p>
  </div>
</div>


      <div className="p-2">

        <div className="flex flex-row" style={{ width: "75%", marginLeft: "auto", marginRight: "auto" }}>
          {sampleReviewData.map((review, i) => (<div className="basis-1/2" style={{ padding: '10px' }} key={i}>  <Card style={{ minHeight: '300px' }}>
            <CardHeader>
              <CardTitle>
                <pre>
                  {review.OUname} {"\n"}
                  {review.teamName}
                </pre>

              </CardTitle>
              <CardDescription>
                <div>

                  {review.date}
                </div>
              </CardDescription>
            </CardHeader>
            <CardContent className='min-h-36 flex justify-center items-center'>
              <div className='flex flex-row' >
                <div style={{ padding: '10px' }} className='flex flex-col justify-center'>
                  <ChevronUpIcon className='h-6 w-6' /> <ChevronDownIcon className='h-6 w-6' />
                </div>
                <p className=''>{review.review}</p>
              </div>
            </CardContent>
            <CardFooter>
              <p>Rating: {review.rating}/5</p>
            </CardFooter>
          </Card></div>))
          }
        </div>





      </div >
      <div style={{ display: "grid", justifyContent: "center" }}>

        <Button onClick={() => loginWithRedirect()}>Post a review</Button>
      </div>
    </>
  );
}
