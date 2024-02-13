import { api } from "@/api/backend";
import { Button } from "@/components/ui/button";
import { useDialogControl } from "@/hooks/useDialogControl";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

interface InterviewDetailsProps {}
export default function InterviewDetails({}: InterviewDetailsProps) {
  const dialogControl = useDialogControl();
  const previewModal = dialogControl.modals["previewInterview"];
  const activeInterview = previewModal?.data.activeInterview;
  const queryClient = useQueryClient();

  const { mutateAsync: deleteInterview } = useMutation({
    mutationFn: api.interviews.deleteInterview,
    onSuccess: () => {
      dialogControl.closeModal("previewInterview");
      toast.success("Interview deleted");
    },
    onError: (error: any, variables, context) => {
      toast.error(
        "Error deleting interview: " + error.response.data.error
      );
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["interviews"],
      });
    },
  });

  function handleOpenEditInterviewModal() {
    dialogControl.openModal("editInterview", {
      activeInterview,
    });
    dialogControl.closeModal("previewInterview");
  }

  function handleDeleteInterview() {
    deleteInterview(activeInterview.id);
  }

  return (
    <div>
      InterviewDetails works
      <Button onClick={handleOpenEditInterviewModal}>Edit</Button>
      <Button onClick={handleDeleteInterview}>Delete</Button>
      <div>
        <pre>{JSON.stringify(activeInterview, null, 2)}</pre>
      </div>
    </div>
  );
}
