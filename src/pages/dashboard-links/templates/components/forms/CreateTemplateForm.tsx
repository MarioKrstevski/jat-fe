import { api } from "@/api/backend";
import SelectField from "@/components/form-fields/SelectField";
import TextField from "@/components/form-fields/TextField";
import TextareaField from "@/components/form-fields/TextareaField";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useDialogControl } from "@/hooks/useDialogControl";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const formSchema = z.object({
  name: z.string(),
  content: z.string().max(3200),
  type: z.string(),
});

interface CreateTemplateFormProps {}
export default function CreateTemplateForm({}: CreateTemplateFormProps) {
  const dialogControl = useDialogControl();
  const queryClient = useQueryClient();

  const { mutateAsync: createTemplate } = useMutation({
    //  @ts-ignore
    mutationFn: api.templates.createTemplate,
    onSuccess: (newTemplate) => {
      //   queryClient.invalidateQueries({ queryKey: ["templates"] });
      queryClient.setQueryData(["templates"], (oldData: any) => {
        return [...oldData, newTemplate];
      });
      dialogControl.closeModal("createTemplate");
      toast.success("Template created");
    },
    onError: (error) => {
      toast.error("Error creating template: " + error);
    },
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      content: "",
      type: "",
    },
  });

  const onSubmit = (templateData: z.infer<typeof formSchema>) => {
    createTemplate(templateData);
  };

  // Add a new function here
  function handleCancel() {
    dialogControl.closeModal("createTemplate");
  }

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          {/* Name */}
          <div>
            <TextField
              form={form}
              fieldName="name"
              label="Name *"
              placeholder="Template Name"
            />
          </div>

          {/* Content */}
          <div className="mb-2">
            <TextareaField
              rows={13}
              form={form}
              fieldName="content"
              label="Template Text"
            />
          </div>

          {/* Type */}
          <div>
            <SelectField
              options={["LinkedIn Outreact", "Cover Letter"]}
              form={form}
              fieldName="type"
              label="Template Type"
              placeholder="Select type "
            />
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
