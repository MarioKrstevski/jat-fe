import { api } from "@/api/backend";
import TextField from "@/components/form-fields/TextField";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { urlRegex } from "@/global/variables";
import { useDialogControl } from "@/hooks/useDialogControl";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const formSchema = z.object({
  companyName: z.string().min(1),
  link: z.string().regex(urlRegex),
});

export default function RequestCompanyForm() {
  const dialogControl = useDialogControl();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      companyName: "",
      link: "",
    },
  });

  const { mutateAsync: requestCompany } = useMutation({
    mutationFn: api.companies.saveCustomCompany,
    onSuccess: () => {
      toast.success("Company request sent");
      dialogControl.closeModal("requestCompany");
    },
    onError: (error: any) => {
      toast.error("Request failed: " + error.response.data.error);
    },
  });

  function handleCompanyRequest(
    companyInfo: z.infer<typeof formSchema>
  ) {
    console.log(companyInfo);
    requestCompany({
      name: companyInfo.companyName,
      link: companyInfo.link,
    });
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
            fieldName="link"
            label={
              <span>
                Link * <small>(ideally a Linkedin link)</small>
              </span>
            }
          />

          <div className="flex justify-end">
            <Button type="submit">Submit</Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
