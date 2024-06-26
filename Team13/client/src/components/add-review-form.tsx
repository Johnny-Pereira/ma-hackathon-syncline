import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "./ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { addReview } from "@/api/review";
import { useAuth0 } from "@auth0/auth0-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const formSchema = z.object({
  OUID: z.string(),
  feedback: z.string(),
  rating: z.coerce.number().min(1).max(5),
  title: z.string(),
});

export default function AddReviewForm() {
  const { user } = useAuth0();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const client = useQueryClient();
  const mutation = useMutation({
    mutationFn: addReview,
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["reviews"] });
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!user || !user.sub) {
      console.log("does not exist");
      return;
    }
    const data = { ...values, userId: user.sub };

    const response = await mutation.mutateAsync(data);
    console.log(response);
    toast.success(response.statusText);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 flex flex-wrap"
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Add a title" type="text" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="feedback"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Review</FormLabel>
              <FormControl>
                <Textarea {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="rating"
          render={({ field }) => (
            <FormItem className="w-1/2 pr-2">
              <FormLabel>Rating</FormLabel>
              <FormControl>
                <Input type="number" {...field} />
              </FormControl>
              <FormDescription>Enter a number 1-5</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="OUID"
          render={({ field }) => (
            <FormItem className="w-1/2">
              <FormLabel>Organizational Unit</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select an OU" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="BANK">Banking</SelectItem>
                  <SelectItem value="IP">Insurance & Pensions</SelectItem>
                  <SelectItem value="SF">Structured Finance</SelectItem>
                  <SelectItem value="KYC">Know Your Customer</SelectItem>
                  <SelectItem value="CRE">Commercial Real Estate</SelectItem>
                  <SelectItem value="DS">Data Solutions</SelectItem>
                  <SelectItem value="PA">Predictive Analytics</SelectItem>
                  <SelectItem value="DI">Digital Insights</SelectItem>
                  <SelectItem value="CPO">Chief Product Office</SelectItem>
                  <SelectItem value="CAO">
                    Chief Administrative Office
                  </SelectItem>
                  <SelectItem value="CRO">Chief Revenue Office</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
