import { api } from "@/api/backend";
import SelectField from "@/components/form-fields/SelectField";
import TextField from "@/components/form-fields/TextField";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useDialogControl } from "@/hooks/useDialogControl";
import { MyResource } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const formSchema = z.object({
  name: z.string(),
  link: z.string().url(),
  image: z.string().optional(),
  category: z.string(),
});

interface EditMyResourceFormProps {}
export default function EditMyResourceForm({}: EditMyResourceFormProps) {
  const dialogControl = useDialogControl();
  const queryClient = useQueryClient();

  const activeMyResource =
    dialogControl.modals.editMyResource?.data?.myResource;

  const { mutateAsync: editMyResource } = useMutation({
    //  @ts-ignore
    mutationFn: api.myResources.editMyResource,
    onSuccess: (updatedMyResource) => {
      //   queryClient.invalidateQueries({ queryKey: ["myResources"] });
      queryClient.setQueryData(["myResources"], (oldData: any) => {
        return oldData.map((d: MyResource) =>
          d.id === updatedMyResource.id ? updatedMyResource : d
        );
      });
      dialogControl.closeModal("editMyResource");
      toast.success("MyResource updated");
    },
    onError: (error) => {
      toast.error("Error updating myResource: " + error);
    },
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: activeMyResource?.name,
      link: activeMyResource?.link,
      image: activeMyResource?.image,
      category: activeMyResource?.category,
    },
  });

  const onSubmit = (myResourceData: z.infer<typeof formSchema>) => {
    editMyResource({
      myResourceDetails: myResourceData,
      myResourceId: activeMyResource.id,
    });
  };

  // Add a new function here
  function handleCancel() {
    dialogControl.closeModal("createMyResource");
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
              placeholder=""
            />
          </div>

          {/* Link */}
          <div>
            <TextField
              form={form}
              fieldName="link"
              label="Link *"
              placeholder="URL link to resource"
            />
          </div>
          {/* Image */}
          <div>
            <TextField
              form={form}
              fieldName="image"
              label="Image (used for icon) *"
              placeholder=" Image URL  or icon:IconName"
            />
          </div>

          {/* Category */}
          <div>
            <SelectField
              options={["Visual", "Learning"]}
              form={form}
              fieldName="category"
              label="Category/Group Name"
              placeholder="Select "
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
