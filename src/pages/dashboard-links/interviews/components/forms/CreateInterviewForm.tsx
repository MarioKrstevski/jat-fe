import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import TextField from "@/components/form-fields/TextField";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useDialogControl } from "@/hooks/useDialogControl";
import { z } from "zod";
import { api } from "@/api/backend";
import { toast } from "sonner";
import DateTimeField from "@/components/form-fields/DateTimeField";
import SelectField from "@/components/form-fields/SelectField";
import {
  defaultInterviewDurationOptions,
  defaultInterviewFormatOptions,
  defaultInterviewTypesOptions,
} from "@/global/values";
import { FolderSyncIcon } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const formSchema = z.object({
  date: z.date(),
  jobApplicationId: z.string().optional().nullable(),
  type: z.string(),
  format: z.string(),
  title: z.string(),
  duration: z.string(),
  location: z.string(),
});

interface CreateInterviewFormProps {}
export default function CreateInterviewForm({}: CreateInterviewFormProps) {
  const dialogControl = useDialogControl();
  const queryClient = useQueryClient();

  const newInterviewData =
    dialogControl.modals.createInterview?.data?.newInterviewData;

  const { mutateAsync: createInterview } = useMutation({
    mutationFn: api.interviews.createInterview,
    onSuccess: () => {
      dialogControl.closeModal("createInterview");
      toast.success("Interview created");
    },
    onError: (error: any, variables, context) => {
      toast.error(
        "Error creating interview: " + error.response.data.error
      );
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["interviews"],
      });
    },
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      date: newInterviewData?.date
        ? new Date(newInterviewData.date)
        : new Date(),
      type: "Technical",
      jobApplicationId: undefined,
      format: "Onsite",
      duration: newInterviewData?.duration ?? "45",
      title: newInterviewData?.title ?? "",
      location: "",
    },
  });

  const localDefaultInterviewDurationOptions =
    defaultInterviewDurationOptions;

  if (
    newInterviewData?.duration &&
    !defaultInterviewDurationOptions.includes(
      newInterviewData.duration
    )
  ) {
    localDefaultInterviewDurationOptions.push(
      newInterviewData.duration
    );
  }

  const onSubmit = (interviewDetails: z.infer<typeof formSchema>) => {
    createInterview(interviewDetails);
  };

  // Add a new function here
  function handleCancel() {
    dialogControl.closeModal("createInterview");
  }

  return (
    <div className="py-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          {/* Date */}
          <div>
            <DateTimeField
              form={form}
              fieldName="date"
              label="Date *"
            />
          </div>
          {/* Type */}
          <div>
            <SelectField
              form={form}
              fieldName="type"
              label="Type *"
              options={defaultInterviewTypesOptions}
            />
          </div>
          {/* Format */}
          <div>
            <SelectField
              form={form}
              fieldName="format"
              label="Format *"
              options={defaultInterviewFormatOptions}
            />
          </div>
          {/* Duration */}
          <div>
            <SelectField
              form={form}
              fieldName="duration"
              label="Duration in minutes"
              options={localDefaultInterviewDurationOptions}
            />
          </div>

          {/* Add contacts */}
          <div>
            <SelectField
              form={form}
              fieldName="contactsIds"
              label="Contacts "
              options={["No contacts found"]}
            />
          </div>

          {/* Connect to Job Application */}
          <div>
            <SelectField
              form={form}
              fieldName="jobApplicationId"
              label="Connect to Job Application"
              options={["No contacts found"]}
            />
          </div>

          {/* Title */}
          <div>
            <TextField
              form={form}
              fieldName="title"
              label={
                <>
                  <div className="flex flex-col mt-4 gap-1">
                    <span>Title</span>
                    <small className="text-gray-500">
                      In case you don't connect to a job application,
                      create a title
                    </small>
                  </div>
                </>
              }
            />
          </div>

          {/* Location */}
          <div>
            <TextField
              form={form}
              fieldName="location"
              label={
                <>
                  <div className="flex flex-col mt-4 gap-1">
                    <span>Location</span>
                    <small className="text-gray-500">
                      * Your zoom link:{" "}
                      <i className="text-gray-700">
                        https://zoom.us/j/123456789
                      </i>
                    </small>
                    <small className="text-gray-500">
                      * Physical Address:{" "}
                      <i className="text-gray-700">
                        New York, 1000th, Building 1, floor 5
                      </i>
                    </small>
                    <small className="text-gray-500">
                      * GPS:{" "}
                      <i className="text-gray-700">
                        40.7128, -74.0060
                      </i>
                    </small>
                  </div>
                </>
              }
            />
          </div>

          {/*Sync with your Google Calendar */}

          {/* Sync to Google (optional) */}
          <div>
            <p className="text-sm text-gray-500">
              Sync with your Google Calendar
            </p>
            <Button
              size={"sm"}
              type="button"
              onClick={() => alert("Synced")}
            >
              <FolderSyncIcon className="mr-2" size={16} /> Sync
            </Button>
          </div>

          <div className="pt-6 space-x-2 flex items-center justify-end">
            <Button
              type="button"
              variant={"ghost"}
              onClick={handleCancel}
            >
              Cancel
            </Button>
            <Button type="submit">Continue</Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
