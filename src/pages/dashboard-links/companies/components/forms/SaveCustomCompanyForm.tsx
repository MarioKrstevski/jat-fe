import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import TextField from "@/components/form-fields/TextField";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { api } from "@/api/backend";
import { toast } from "sonner";
import { useDialogControl } from "@/hooks/useDialogControl";
import { urlRegex } from "@/global/variables";

const formSchema = z.object({
  companyName: z.string().min(1),
  link: z.string().regex(urlRegex).optional(),
});

export default function SaveCustomCompanyForm() {
  const dialogControl = useDialogControl();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      companyName: "",
      link: undefined,
    },
  });

  function handleSaveCustomCompany(
    companyInfo: z.infer<typeof formSchema>
  ) {
    console.log(companyInfo);

    if (companyInfo.link) {
      companyInfo.link = companyInfo.link.startsWith("http")
        ? companyInfo.link
        : "https://" + companyInfo.link;
    }

    api.companies
      .saveCustomCompany(companyInfo.companyName, companyInfo.link)
      .then((response) => {
        console.log(response);
        toast.success("Company saved");

        dialogControl.closeModal("saveCustomCompany");
      })
      .catch((error) => {
        console.error("Error saving company:", error);
        if (error.response) {
          console.error(error.response.data);
          toast.error(
            "Error saving company: " + error.response.data.error
          );
        }
      })
      .finally(() => {});
  }

  async function onSubmit(values: z.infer<typeof formSchema>) {
    handleSaveCustomCompany(values);
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
                Link <small>(ideally a Linkedin link )</small>
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
