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

import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { DateTimePicker } from "../../../../../components/DateTimePicker";
import { api } from "@/api/backend";
import { useAuth } from "@clerk/clerk-react";
import { JobApplication } from "@/types";
import { useDialogControl } from "@/hooks/useDialogControl";
import { parseDateOrUndefined } from "@/lib/utils";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "@/global/variables";

const formSchema = z.object({
  nextInterviewDate: z.date().nullish(),
});
export default function EditJANextInterviewDateForm() {
  const [isLoading, setIsLoading] = useState(false);

  const dialogControl = useDialogControl();

  const interviewDateChangeModal =
    dialogControl.modals["editInterviewDate"];
  const activeJobApplication = interviewDateChangeModal?.data
    .value as JobApplication;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      //  undefined because they need to select a date
      nextInterviewDate: parseDateOrUndefined(
        activeJobApplication?.nextInterviewDate
      ),
    },
  });

  const { mutateAsync: editJobApplication } = useMutation({
    mutationFn: api.applications.editJobApplication,
    onSuccess: (newData: JobApplication) => {
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
      toast.success("Job application interview date updated");
      dialogControl.closeModal("editInterviewDate");
    },
    onError: (err: any) => {
      toast.error(
        "Error editing application: ",
        err.response.data.error
      );
    },
  });

  function handleEditJobApplication(
    application: any,
    applicationId: string
  ) {
    editJobApplication({
      application,
      applicationId,
      type: "nextInterviewDateChange",
    });
  }

  useEffect(() => {
    // this reset is important to update the data if we open a job close it and open
    // another one which has a new date, this needs to update it since we are using one
    // modal for all the jobs
    form.reset({
      nextInterviewDate: parseDateOrUndefined(
        activeJobApplication.nextInterviewDate
      ),
    });

    // console.log("values", form.getValues());
  }, [activeJobApplication]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const valuesToSend = { ...values };

    if (valuesToSend.nextInterviewDate === undefined) {
      valuesToSend.nextInterviewDate = null;
    }

    console.log("values", valuesToSend);
    console.log("values", typeof valuesToSend.nextInterviewDate);

    handleEditJobApplication(valuesToSend, activeJobApplication.id);
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
                            form.setValue("nextInterviewDate", date);
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
              variant={"ghost"}
              type="button"
              onClick={() => {
                dialogControl.closeModal("editInterviewDate");
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
