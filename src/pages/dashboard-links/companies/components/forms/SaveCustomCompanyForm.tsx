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
import { Note, SavedCompany } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const formSchema = z.object({
  companyName: z.string().min(1),
  link: z.string().regex(urlRegex).optional(),
});

interface NewSavedData {
  company: SavedCompany;
  note: Note;
}
export default function SaveCustomCompanyForm() {
  const dialogControl = useDialogControl();
  const queryClient = useQueryClient();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      companyName: "",
      link: undefined,
    },
  });

  const { mutateAsync: saveCustomCompany } = useMutation({
    mutationFn: api.companies.saveCustomCompany,
    onSuccess: (newData: NewSavedData) => {
      queryClient.setQueryData(
        ["savedCompanies"],
        (oldData: SavedCompany[]) => {
          return [
            { ...newData.company, note: newData.note },
            ...oldData,
          ];
        }
      );
      toast.success("Company saved");
      dialogControl.closeModal("saveCustomCompany");
    },
    onError: (error) => {
      toast.error(error.message);
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
    saveCustomCompany({
      name: companyInfo.companyName,
      link: companyInfo.link,
    });
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
