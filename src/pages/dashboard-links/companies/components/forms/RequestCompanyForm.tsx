import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import TextField from "@/components/form-fields/TextField";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { api } from "@/api/backend";
import { toast } from "sonner";

const formSchema = z.object({
  companyName: z.string().min(1),
  linkedinUrl: z
    .string()
    .regex(/^(https?:\/\/)?([\w-]+\.)*linkedin\.com(\/.*)?$/),
});

export default function RequestCompanyForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      companyName: "",
      linkedinUrl: "",
    },
  });

  function handleCompanyRequest(
    companyInfo: z.infer<typeof formSchema>
  ) {
    console.log(companyInfo);
    api.companies
      .requestCompany(
        companyInfo.companyName,
        companyInfo.linkedinUrl
      )
      .then((response) => {
        console.log(response);
        toast.success("Company requested");
      })
      .catch((error) => {
        console.error("Error requesting company:", error);
        if (error.response) {
          console.error(error.response.data);
          toast.error(
            "Error requesting company: " + error.response.data.error
          );
        }
      })
      .finally(() => {});
  }
  async function onSubmit(values: z.infer<typeof formSchema>) {
    handleCompanyRequest(values);
  }
  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <TextField
            form={form}
            fieldName="companyName"
            label="Company Name *"
          />
          <TextField
            form={form}
            fieldName="linkedinUrl"
            label="LinkedIn URL*"
          />

          <div className="flex justify-end">
            <Button type="submit">Submit</Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
