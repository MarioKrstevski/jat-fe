"use client";

import { Modal } from "../ui/custom/modal";
import { useStatusChangeModal } from "@/hooks/modals/useStatusChangeModal";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import {
  SelectValue,
  SelectTrigger,
  SelectLabel,
  SelectItem,
  SelectGroup,
  SelectContent,
  Select,
} from "@/components/ui/select";

import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { JobApplicationStatus, TimelineEntry } from "@/types";
import { Checkbox } from "../ui/checkbox";
import { DateTimePicker } from "../DateTimePicker";
import { api } from "@/api/backend";
import { useJobApplicationsStore } from "@/hooks/useJobApplicationsStore";
import { useAuth } from "@clerk/clerk-react";
import { set } from "date-fns";

const formSchema = z.object({
  id: z.string(),
  status: z.string(),
  waitingFor: z.string().optional(),
  date: z.date().optional(),
});

export default function StatusChangeModal() {
  const statusChangeModal = useStatusChangeModal();
  const { userId } = useAuth();
  const jobApplicationStore = useJobApplicationsStore();
  const status = useStatusChangeModal((store) => store.data.status);
  const nextStep = useStatusChangeModal(
    (store) => store.data.nextStep
  );
  const statusOptionsString = useStatusChangeModal(
    (store) => store.data.statusOptions
  );
  const [isLoading, setIsLoading] = useState(false);
  const [addToTimeline, setAddToTimeline] = useState(false);

  const statusOptions = statusOptionsString.split(
    ","
  ) as JobApplicationStatus[];
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: statusChangeModal.data.ja.id,
      status: status,
      waitingFor: nextStep,
      //  undefined because they need to select a date
      date: undefined,
    },
  });

  useEffect(() => {
    form.reset({
      id: statusChangeModal.data.ja.id,
      status: status,
      waitingFor: nextStep,
      date: new Date(),
    });
    setAddToTimeline(false);
  }, [statusChangeModal.data]);

  function handleEditJobApplication(
    jobApplication: any,
    userId: string
  ) {
    setIsLoading(true);
    api
      .be_editJobApplication(jobApplication, userId, "statusChange")
      .then((res) => {
        console.log("res.data", res.data);

        const newJobApplicationsArray =
          jobApplicationStore.jobApplications.map((ja) => {
            if (ja.id === jobApplication.id) {
              return res.data;
            } else {
              return ja;
            }
          });

        jobApplicationStore.setData(newJobApplicationsArray);
        form.reset();
        toast.success("Job application updated");
        statusChangeModal.onClose();
      })
      .catch((err) => {
        console.log("err", err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }
  async function onSubmit(values: z.infer<typeof formSchema>) {
    // TODO: create store
    console.log("values", values);
    // also use addToTimeline to request to include or omit date
    const valueToSend = { ...values } as any;
    if (!addToTimeline) {
      delete valueToSend.date;
    } else {
      let existingTimeline: TimelineEntry[];
      if (!statusChangeModal.data.ja.timeline) {
        existingTimeline = [];
      } else {
        existingTimeline = JSON.parse(
          statusChangeModal.data.ja.timeline
        );
      }
      existingTimeline.push({
        date: valueToSend.date.getTime().toString(),
        status: valueToSend.status,
      });
      valueToSend.timeline = JSON.stringify(existingTimeline);
      delete valueToSend.date;
    }
    handleEditJobApplication(valueToSend, userId!);
  }
  if (!statusChangeModal.data.ja) {
    return null;
  }

  return (
    <Modal
      title="Status update"
      description={`Update the status of your job application, you can also change the next step and add a date for this event in your timeline. So that later on you can have a
      an overview of the time it took you to get a job. You can add custom status if you want to.
      `}
      isOpen={statusChangeModal.isOpen}
      onClose={statusChangeModal.onClose}
    >
      <div className="space-y-4 py-2 pb-4">
        {form.formState.errors && (
          <div>{JSON.stringify(form.formState.errors)}</div>
        )}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex gap-4 mb-3">
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel>Status *</FormLabel>
                      <FormControl>
                        <Select
                          value={field.value}
                          onValueChange={(selection) => {
                            form.setValue("status", selection);
                          }}
                        >
                          <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Select columns" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              {/* <SelectLabel>Columns</SelectLabel> */}
                              {statusOptions.map((option) => {
                                return (
                                  <SelectItem
                                    value={option}
                                    key={option}
                                  >
                                    {option}
                                  </SelectItem>
                                );
                              })}
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </FormControl>
                    </FormItem>
                  );
                }}
              />
              <FormField
                control={form.control}
                name="waitingFor"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel>Next Step</FormLabel>
                      <FormControl>
                        <Select
                          value={field.value}
                          onValueChange={(selection) => {
                            form.setValue("waitingFor", selection);
                          }}
                        >
                          <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Select columns" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              {/* <SelectLabel>Columns</SelectLabel> */}
                              {statusOptions.map((option) => {
                                return (
                                  <SelectItem
                                    value={option}
                                    key={option}
                                  >
                                    {option}
                                  </SelectItem>
                                );
                              })}
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </FormControl>
                    </FormItem>
                  );
                }}
              />
            </div>
            <div className="flex gap-4 my-5">
              <div className="items-top flex space-x-2">
                <Checkbox
                  id="to-timeline"
                  checked={addToTimeline}
                  onCheckedChange={(e) => {
                    // console.log("e", e);
                    setAddToTimeline(e as boolean);
                  }}
                />
                <div className="grid gap-1.5 leading-none">
                  <label
                    htmlFor="to-timeline"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Add to timeline
                  </label>
                  <p className="text-sm text-muted-foreground">
                    Date will be recorded to create a timeline later
                    on for a more visual experience
                  </p>
                </div>
              </div>
            </div>
            <div className="flex gap-4 mb-3">
              {addToTimeline && (
                <FormField
                  control={form.control}
                  name="date"
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel>Date for timeline</FormLabel>
                        <br />
                        <FormControl>
                          <DateTimePicker
                            // Create new date here because otherwise the value that is set is made when component loads and it loads on page load
                            date={field.value}
                            setDate={(date) => {
                              form.setValue("date", date);
                            }}
                          />
                        </FormControl>
                      </FormItem>
                    );
                  }}
                />
              )}
            </div>

            <div className="pt-6 space-x-2 flex items-center justify-end">
              <Button
                disabled={isLoading}
                variant={"outline"}
                type="button"
                onClick={statusChangeModal.onClose}
              >
                Cancel
              </Button>
              <Button disabled={isLoading} type="submit">
                Continue
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </Modal>
  );
}
