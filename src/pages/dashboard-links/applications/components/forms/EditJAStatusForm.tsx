import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { api } from "@/api/backend";
import { Button } from "@/components/ui/button";
import { useDialogControl } from "@/hooks/useDialogControl";
import {
  JobApplication,
  JobApplicationStatus,
  TimelineEntry,
} from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { DateTimePicker } from "../../../../../components/DateTimePicker";
import { Checkbox } from "../../../../../components/ui/checkbox";

const formSchema = z.object({
  status: z.string(),
  nextStep: z.string().optional(),
  date: z.date().optional(),
});

export default function EditJAStatusForm() {
  const queryClient = useQueryClient();
  const [isLoading, setIsLoading] = useState(false);
  const [addToTimeline, setAddToTimeline] = useState(false);

  const dialogControl = useDialogControl();
  const statusChangeModal = dialogControl.modals["editStatus"];
  const activeJobApplication = statusChangeModal?.data
    .value as JobApplication;

  const statusOptions = activeJobApplication.statusOptions.split(
    ","
  ) as JobApplicationStatus[];

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      status: activeJobApplication.status,
      nextStep: activeJobApplication.nextStep,
      //  undefined because they need to select a date
      date: undefined,
    },
  });

  const { mutateAsync: editJobApplication } = useMutation({
    mutationFn: api.applications.editJobApplication,
    onSuccess: (newData: JobApplication) => {
      queryClient.invalidateQueries({
        queryKey: ["jobApplications"],
      });
      queryClient.setQueryData(
        ["jobApplications"],
        (oldData: JobApplication[]): JobApplication[] => {
          return oldData.map((ja) => {
            if (ja.id === newData.id) {
              console.log(ja, newData);
              return newData;
            }
            return ja;
          });
        }
      );
      form.reset();
      toast.success("Job application updated");
      dialogControl.closeModal("editStatus");
    },
    onError: (err: any) => {
      toast.error(
        "Error editing application: ",
        err.response.data.error
      );
    },
  });

  useEffect(() => {
    form.reset({
      status: activeJobApplication.status,
      nextStep: activeJobApplication.nextStep,
      date: new Date(),
    });
    setAddToTimeline(false);
  }, [activeJobApplication]);

  function handleEditJobApplication(
    application: any,
    applicationId: string
  ) {
    editJobApplication({
      application,
      applicationId,
      type: "statusChange",
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
      if (!activeJobApplication.timeline) {
        existingTimeline = [];
      } else {
        existingTimeline = JSON.parse(activeJobApplication.timeline);
      }
      existingTimeline.push({
        date: valueToSend.date.getTime().toString(),
        status: valueToSend.status,
      });
      valueToSend.timeline = JSON.stringify(existingTimeline);
      delete valueToSend.date;
    }
    handleEditJobApplication(valueToSend, activeJobApplication.id);
  }

  return (
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
              name="nextStep"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Next Step</FormLabel>
                    <FormControl>
                      <Select
                        value={field.value}
                        onValueChange={(selection) => {
                          form.setValue("nextStep", selection);
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
                  Date will be recorded to create a timeline later on
                  for a more visual experience
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
              variant={"ghost"}
              type="button"
              onClick={() => {
                dialogControl.closeModal("editStatus");
              }}
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
  );
}
