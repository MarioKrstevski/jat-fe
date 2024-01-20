"use client";

import { Modal } from "../ui/custom/modal";
import { useStatusChangeModal } from "@/hooks/useStatusChangeModal";
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

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import StateSelector from "../StateSelector";
import { JobApplication, JobApplicationStatus } from "@/types";
import { Checkbox } from "../ui/checkbox";
import { DateTimePicker } from "../DateTimePicker";
import { set } from "date-fns";

const formSchema = z.object({
  status: z.string().min(3),
  waitingFor: z.string().optional(),
  date: z.date().optional(),
});

export default function StatusChangeModal() {
  const statusChangeModal = useStatusChangeModal();
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
      status: status,
      waitingFor: nextStep,
      //  undefined because they need to select a date
      date: undefined,
    },
  });

  useEffect(() => {
    if (!statusChangeModal.data.status) {
      return;
    }
    form.reset({
      status: status,
      waitingFor: nextStep,
      date: new Date(),
    });
  }, [statusChangeModal.data]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    // TODO: create store
    console.log("values", values);
    // also use addToTimeline to request to include or omit date

    statusChangeModal.onClose();
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
                    console.log("field date", field);
                    return (
                      <FormItem>
                        <FormLabel>Next Step</FormLabel>
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
