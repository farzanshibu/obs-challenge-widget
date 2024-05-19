"use client";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { formSchema } from "@/schema/formSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import { useForm } from "react-hook-form";

import { z } from "zod";

import { useChallengeStore } from "@/store/fetchstore";
import { toast } from "sonner";
import { Checkbox } from "./ui/checkbox";

function ChallengeForm() {
  const { loading } = useChallengeStore((state) => ({
    loading: state.loading,
  }));

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (values.currentValue >= values.maxValue) {
      toast.error("Current value cannot be greater than max value");
      return;
    }
    if (values.maxValue < 0 || values.currentValue < 0) {
      toast.error("Values cannot be negative");
      return;
    }
    useChallengeStore.getState().setChallenge({ ...values });
  };

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <Card className="bg-zinc-800 border-zinc-950">
            <CardHeader>
              <CardTitle className="text-slate-50">Challenge Details</CardTitle>
            </CardHeader>
            <CardContent>
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-slate-50">Challenge</FormLabel>
                    <FormControl>
                      <Input
                        className="text-slate-50 placeholder:text-slate-50/20"
                        placeholder="Challenge"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription className="text-slate-50">
                      Name of the Challenge.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid lg:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="currentValue"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-slate-50">
                        Current Value
                      </FormLabel>
                      <FormControl>
                        <Input
                          className="text-slate-50 placeholder:text-slate-50/20"
                          placeholder="0"
                          {...field}
                          type="number"
                        />
                      </FormControl>
                      <FormDescription className="text-slate-50">
                        Current Score of the Challenge
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="maxValue"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-slate-50">Max Value</FormLabel>
                      <FormControl>
                        <Input
                          className="text-slate-50 placeholder:text-slate-50/20"
                          placeholder="100"
                          {...field}
                          type="number"
                        />
                      </FormControl>
                      <FormDescription className="text-slate-50">
                        Maximum Score of the Challenge.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid lg:grid-cols-2 gap-4 items-center justify-center pt-3">
                <FormField
                  control={form.control}
                  name="endDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-slate-50">End Date</FormLabel>
                      <FormControl>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <div className="flex">
                                <Button
                                  type="button"
                                  variant={"outline"}
                                  className={cn(
                                    "w-[240px] pl-3 text-left font-normal",
                                    !field.value && "text-muted-foreground"
                                  )}
                                >
                                  {field.value ? (
                                    format(field.value, "PPP")
                                  ) : (
                                    <span>Pick a date</span>
                                  )}
                                  <CalendarIcon className="ml-auto h-4 w-4" />
                                </Button>
                              </div>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              className="bg-zinc-800 text-slate-50 "
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              disabled={(date) => date < new Date()}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                      </FormControl>
                      <FormDescription className="text-slate-50">
                        End Date of the challenge.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="is_active"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-slate-50">
                        Active Challenge
                      </FormLabel>
                      <FormControl>
                        <Checkbox
                          className="w-5 h-5 ml-5"
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormDescription className="text-slate-50">
                        Is this challenge active?
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button type="submit" disabled={loading}>
                {loading ? "Adding..." : "Add Challenge"}
              </Button>
            </CardFooter>
          </Card>
        </form>
      </Form>
    </div>
  );
}

export default ChallengeForm;
