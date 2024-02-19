import { api } from "@/api/backend";
import SelectField from "@/components/form-fields/SelectField";
import TextField from "@/components/form-fields/TextField";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useDialogControl } from "@/hooks/useDialogControl";
import { Document } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const formSchema = z.object({
  label: z.string(),
  extension: z.string(),
  link: z.string().url(),
  type: z.string(),
});

interface EditDocumentFormProps {}
export default function EditDocumentForm({}: EditDocumentFormProps) {
  const dialogControl = useDialogControl();
  const queryClient = useQueryClient();

  const activeDocument =
    dialogControl.modals.editDocument?.data?.document;

  const { mutateAsync: editDocument } = useMutation({
    //  @ts-ignore
    mutationFn: api.documents.editDocument,
    onSuccess: (updatedDocument) => {
      //   queryClient.invalidateQueries({ queryKey: ["documents"] });
      queryClient.setQueryData(["documents"], (oldData: any) => {
        return oldData.map((d: Document) =>
          d.id === updatedDocument.id ? updatedDocument : d
        );
      });
      dialogControl.closeModal("editDocument");
      toast.success("Document updated");
    },
    onError: (error) => {
      toast.error("Error updating document: " + error);
    },
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      label: activeDocument?.label,
      extension: activeDocument?.extension,
      link: activeDocument?.link,
      type: activeDocument.type,
    },
  });

  const onSubmit = (documentData: z.infer<typeof formSchema>) => {
    editDocument({
      documentDetails: documentData,
      documentId: activeDocument.id,
    });
  };

  // Add a new function here
  function handleCancel() {
    dialogControl.closeModal("createDocument");
  }

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          {/* Label */}
          <div>
            <TextField
              form={form}
              fieldName="label"
              label="Label/Name *"
              placeholder="Main Resume "
            />
          </div>

          {/* Type */}
          <div>
            <SelectField
              options={["Resume", "Cover Letter", "Other"]}
              form={form}
              fieldName="type"
              label="Document Type *"
              placeholder="Select Type "
            />
          </div>

          {/* Extension */}
          <div>
            <SelectField
              options={[".pdf", ".docx"]}
              form={form}
              fieldName="extension"
              label="Document Extension"
              placeholder="Select Extension "
            />
          </div>
          {/* Link */}
          <div>
            <TextField
              form={form}
              fieldName="link"
              label="Link URL *"
              placeholder="Link to drive "
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
