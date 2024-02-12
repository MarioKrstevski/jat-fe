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
  contactsIds: z.array(z.string()),
});

interface CreateInterviewFormProps {}
export default function CreateInterviewForm({}: CreateInterviewFormProps) {
  const dialogControl = useDialogControl();
  const queryClient = useQueryClient();

  const { mutateAsync: createInterview } = useMutation({
    mutationFn: api.interviews.createInterview,
    onSuccess: () => {
      dialogControl.closeModal("createInterview");
      toast.success("Interview created");
    },
    onError: (error: any, variables, context) => {
      toast.error(
        "Error creating contact: " + error.response.data.error
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
      date: new Date(),
      type: "Technical",
      jobApplicationId: undefined,
      format: "Onsite",
      contactsIds: [],
    },
  });

  const onSubmit = (interviewDetails: z.infer<typeof formSchema>) => {
    console.log(interviewDetails);

    createInterview(interviewDetails);
    api.interviews
      .createInterview(interviewDetails)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.error("Error creating interview:", error);
      })
      .finally(() => {});
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

          {/*Sync with your Google Calendar */}
          <div>
            <p className="text-sm text-gray-500">
              Sync with your Google Calendar
            </p>
            <Button size={"sm"} onClick={() => alert("Synced")}>
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
