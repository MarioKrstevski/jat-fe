import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import TextField from "@/components/form-fields/TextField";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useDialogControl } from "@/hooks/useDialogControl";
import { z } from "zod";
import { api } from "@/api/backend";
import { toast } from "sonner";

const formSchema = z.object({
  name: z.string().min(1),
  positionOrDepartment: z.string().optional(),
  companyName: z.string().optional(),
  email: z.string().email().optional().or(z.literal("")),
  linkedin: z.string().url().optional().or(z.literal("")),
  phone: z.string().optional(),
});

interface CreateContactFormProps {}
export default function CreateContactForm({}: CreateContactFormProps) {
  const dialogControl = useDialogControl();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      positionOrDepartment: "",
      companyName: "",
      //   companyId: "",
      email: "",
      linkedin: "",
      phone: "",
    },
  });

  const onSubmit = (contactData: z.infer<typeof formSchema>) => {
    console.log(contactData);
    api.contacts
      .createContact(contactData)
      .then((response) => {
        console.log(response);
        dialogControl.closeModal("createContact");
        toast.success("Contact created");
      })
      .catch((error) => {
        console.error("Error creating contact:", error);
        toast.error(
          "Error creating contact: " + error.response.data.error
        );
      })
      .finally(() => {});
  };

  // Add a new function here
  function handleCancel() {
    dialogControl.closeModal("editJA");
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
          <div className="pt-6 space-x-2 flex items-center justify-end">
            <Button
              type="button"
              variant={"outline"}
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
