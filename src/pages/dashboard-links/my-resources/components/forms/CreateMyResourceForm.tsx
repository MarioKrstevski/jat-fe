import { api } from "@/api/backend";
import SelectField from "@/components/form-fields/SelectField";
import TextField from "@/components/form-fields/TextField";
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
  link: z.string().url(),
  image: z.string().optional(),
  category: z.string(),
});

interface CreateMyResourceFormProps {}
export default function CreateMyResourceForm({}: CreateMyResourceFormProps) {
  const dialogControl = useDialogControl();
  const queryClient = useQueryClient();

  const { mutateAsync: createMyResource } = useMutation({
    //  @ts-ignore
    mutationFn: api.myResources.createMyResource,
    onSuccess: (newMyResource) => {
      //   queryClient.invalidateQueries({ queryKey: ["myResources"] });
      queryClient.setQueryData(["myResources"], (oldData: any) => {
        return [...oldData, newMyResource];
      });
      dialogControl.closeModal("createMyResource");
      toast.success("MyResource created");
    },
    onError: (error) => {
      toast.error("Error creating myResource: " + error);
    },
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      link: "",
      image: "",
      category: "",
    },
  });

  const onSubmit = (myResourceData: z.infer<typeof formSchema>) => {
    createMyResource(myResourceData);
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
