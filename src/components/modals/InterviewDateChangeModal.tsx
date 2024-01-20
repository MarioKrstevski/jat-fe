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
import { useInterviewDateChangeModal } from "@/hooks/useInterviewDateChangeModal";

const formSchema = z.object({
  date: z.date().optional(),
});

export default function InterviewDateChangeModal() {
  const interviewDateChangeModal = useInterviewDateChangeModal();
  const dateSelected = useInterviewDateChangeModal(
    (store) => store.data.date
  );

  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      date: dateSelected,
      //  undefined because they need to select a date
    },
  });

  useEffect(() => {
    if (!interviewDateChangeModal.data.date) {
      return;
    }
    // this reset is important to update the data if we open a job close it and open
    // another one which has a new date, this needs to update it since we are using one
    // modal for all the jobs
    form.reset({
      date: dateSelected,
    });
  }, [interviewDateChangeModal.data]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("values", values);

    interviewDateChangeModal.onClose();
  }
  if (!interviewDateChangeModal.data.ja) {
    return null;
  }

  return (
    <Modal
      title="Status update"
      description={`Update the status of your job application, you can also change the next step and add a date for this event in your timeline. So that later on you can have a
      an overview of the time it took you to get a job. You can add custom status if you want to.
      `}
      isOpen={interviewDateChangeModal.isOpen}
      onClose={interviewDateChangeModal.onClose}
    >
      <div className="space-y-4 py-2 pb-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex gap-4 mb-3">
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel>Next Interview Date *</FormLabel>
                      <FormControl>
                        <div className="flex items-center">
                          <DateTimePicker
                            date={field.value}
                            enableClear
                            setDate={(date) => {
                              form.setValue("date", date);
                            }}
                          />
                        </div>
                      </FormControl>
                    </FormItem>
                  );
                }}
              />
            </div>

            <div className="pt-6 space-x-2 flex items-center justify-end">
              <Button
                disabled={isLoading}
                variant={"outline"}
                type="button"
                onClick={interviewDateChangeModal.onClose}
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
