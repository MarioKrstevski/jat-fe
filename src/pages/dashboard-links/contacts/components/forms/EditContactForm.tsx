import { api } from "@/api/backend";
import SelectField from "@/components/form-fields/SelectField";
import TextField from "@/components/form-fields/TextField";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { defaultContactRelationshipOptions } from "@/global/values";
import { useDialogControl } from "@/hooks/useDialogControl";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const formSchema = z.object({
  name: z.string().min(1),
  relationship: z.string(),
  positionOrDepartment: z.string().optional(),
  companyName: z.string().optional(),
  email: z.string().email().optional().or(z.literal("")),
  linkedin: z.string().url().optional().or(z.literal("")),
  phone: z.string().optional(),
});

interface EditContactFormProps {}
export default function EditContactForm({}: EditContactFormProps) {
  const dialogControl = useDialogControl();
  const queryClient = useQueryClient();

  const { mutateAsync: updateContact } = useMutation({
    //  @ts-ignore
    mutationFn: api.contacts.updateContact,
    onSuccess: (deletedContact) => {
      // queryClient.invalidateQueries({ queryKey: ["contacts"] });
      queryClient.setQueryData(["contacts"], (oldData: any) => {
        return oldData.filter((contact: any) => {
          return contact.id !== deletedContact.id;
        });
      });

      toast.success("Contact updated");
      dialogControl.closeModal("editContact");
    },

    onError: (error) => {
      toast.error("Error updating contact: " + error);
    },
  });

  const contactEdited =
    dialogControl.modals.editContact?.data.contact;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: contactEdited.name || "",
      positionOrDepartment: contactEdited.positionOrDepartment || "",
      relationship: contactEdited.relationship || "Other",
      companyName: contactEdited.companyName || "",
      email: contactEdited.email || "",
      linkedin: contactEdited.linkedin || "",
      phone: contactEdited.phone || "",
    },
  });

  const onSubmit = (contactData: z.infer<typeof formSchema>) => {
    console.log(contactData);
    updateContact({ contactData, contactId: contactEdited.id });
  };

  // Add a new function here
  function handleCancel() {
    dialogControl.closeModal("editContact");
  }

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          {/* Name Field */}
          <div>
            <TextField form={form} fieldName="name" label="Name*" />
          </div>
          {/* Company Name Field */}
          <div>
            <TextField
              form={form}
              fieldName="companyName"
              label="Company Name"
            />
          </div>
          {/* Position or Department Field */}
          <div>
            <TextField
              form={form}
              fieldName="positionOrDepartment"
              label="Position or Department"
            />
          </div>

          {/* Position or Department Field */}
          <div>
            <SelectField
              form={form}
              fieldName="relationship"
              label="Relationship"
              options={defaultContactRelationshipOptions}
            />
          </div>
          {/* Email Field */}
          <div>
            <TextField form={form} fieldName="email" label="Email" />
          </div>
          {/* LinkedIn URL Field */}
          <div>
            <TextField
              form={form}
              fieldName="linkedin"
              label="LinkedIn URL"
            />
          </div>
          {/* Phone Field */}
          <div>
            <TextField form={form} fieldName="phone" label="Phone" />
          </div>
          {/* Company ID Field */}
          {/* <div>
            <TextField
              form={form}
              fieldName="companyId"
              label="Company ID"
            />
          </div> */}
          <div className="pt-6 mb-4 md:mb-0 space-x-2 flex items-center justify-end">
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
