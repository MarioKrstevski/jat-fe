import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import TextField from "@/components/form-fields/TextField";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { api } from "@/api/backend";
import { toast } from "sonner";
import { useDialogControl } from "@/hooks/useDialogControl";
import { queryClient, urlRegex } from "@/global/variables";
import { useMutation } from "@tanstack/react-query";
import { SavedCompany } from "@/types";

const formSchema = z.object({
  companyName: z.string().min(1),
  link: z.string().regex(urlRegex).optional(),
});

export default function EditCustomCompanyForm() {
  const dialogControl = useDialogControl();
  const savedCompanyEdited =
    dialogControl.modals.editSavedCustomCompany?.data.savedCompany!;
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      companyName: savedCompanyEdited.name || "",
      link: savedCompanyEdited?.link || undefined,
    },
  });

  const { mutateAsync: updateSavedCustomCompany } = useMutation({
    mutationFn: api.companies.updateSavedCustomCompany,
    onSuccess: (editedSavedCompany) => {
      queryClient.setQueryData(
        ["savedCompanies"],
        (oldData: SavedCompany[]) => {
          return oldData.map((sc: SavedCompany) => {
            if (sc.id === editedSavedCompany.id) {
              return editedSavedCompany;
            } else {
              return sc;
            }
          });
        }
      );
      toast.success("Company edited");
      dialogControl.closeModal("editSavedCustomCompany");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  function handleUpdateSavedCustomCompan(
    companyInfo: z.infer<typeof formSchema>
  ) {
    console.log(companyInfo);

    if (companyInfo.link) {
      companyInfo.link = companyInfo.link.startsWith("http")
        ? companyInfo.link
        : "https://" + companyInfo.link;
    }
    updateSavedCustomCompany({
      name: companyInfo.companyName,
      link: companyInfo.link,
      savedCompanyId: savedCompanyEdited.id,
    });
  }

  async function onSubmit(values: z.infer<typeof formSchema>) {
    handleUpdateSavedCustomCompan(values);
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
