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
import { useInterviewDateChangeModal } from "@/hooks/modals/useInterviewDateChangeModal";
import { api } from "@/api/backend";
import { useAuth } from "@clerk/clerk-react";
import { useJobApplicationsStore } from "@/hooks/useJobApplicationsStore";

const formSchema = z.object({
  id: z.string(),
  nextInterviewDate: z.date().nullish(),
});

export default function InterviewDateChangeModal() {
  const { userId } = useAuth();
  const interviewDateChangeModal = useInterviewDateChangeModal();
  const jobApplicationStore = useJobApplicationsStore();

  const dateSelected = useInterviewDateChangeModal(
    (store) => store.data.nextInterviewDate
  );

  const jaId = useInterviewDateChangeModal(
    (store) => store.data.ja.id
  );

  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      //  undefined because they need to select a date
      nextInterviewDate: dateSelected,
      id: jaId,
    },
  });

  function handleEditJobApplication(
    jobApplication: any,
    userId: string
  ) {
    setIsLoading(true);
    api
      .be_editJobApplication(
        jobApplication,
        userId,
        "nextInterviewDateChange"
      )
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
        toast.success("Job application interview date updated");
        interviewDateChangeModal.onClose();
      })
      .catch((err) => {
        console.log("err", err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  useEffect(() => {
    // this reset is important to update the data if we open a job close it and open
    // another one which has a new date, this needs to update it since we are using one
    // modal for all the jobs
    form.reset({
      id: jaId,
      nextInterviewDate: dateSelected,
    });
  }, [interviewDateChangeModal.data]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const valuesToSend = { ...values };
    if (valuesToSend.nextInterviewDate === undefined) {
      valuesToSend.nextInterviewDate = null;
    }

    console.log("values", valuesToSend);
    handleEditJobApplication(valuesToSend, userId!);
  }
  if (!interviewDateChangeModal.data.ja) {
    return null;
  }

  return (
    <Modal
      title="Interview Date Update"
      description={`Set the next interview date to be reminded about it`}
      isOpen={interviewDateChangeModal.isOpen}
      onClose={interviewDateChangeModal.onClose}
    >
      <div className="space-y-4 py-2 pb-4">
        {/* {form.formState.errors && (
          <div>{JSON.stringify(form.formState.errors)}</div>
        )} */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex gap-4 mb-3">
              <FormField
                control={form.control}
                name="nextInterviewDate"
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
                              form.setValue(
                                "nextInterviewDate",
                                date
                              );
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
              <Button
                disabled={isLoading}
                type="submit"
                onClick={() => {
                  console.log(form.getValues());
                }}
              >
                Continue
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </Modal>
  );
}
