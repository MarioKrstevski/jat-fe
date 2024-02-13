import { api } from "@/api/backend";
import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  Card,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useDialogControl } from "@/hooks/useDialogControl";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { TrashIcon } from "lucide-react";
import { Interview } from "@/types";
import { format } from "date-fns";
import NoteForm from "@/components/NoteForm";

interface InterviewDetailsProps {}
export default function InterviewDetails({}: InterviewDetailsProps) {
  const dialogControl = useDialogControl();
  const previewModal = dialogControl.modals["previewInterview"];
  const activeInterview: Interview =
    previewModal?.data.activeInterview;
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
    <Card className="w-full max-w-lg border-none shadow-none">
      <CardHeader className="flex flex-row justify-between p-0 mb-4">
        <div className="grid gap-1.5">
          <CardTitle>{activeInterview.title || "No title"}</CardTitle>
          <CardDescription>
            Interview details and information.
          </CardDescription>
        </div>
        <div className="flex items-center gap-1">
          <Button
            size="sm"
            variant="outline"
            onClick={handleOpenEditInterviewModal}
          >
            Edit
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={handleDeleteInterview}
          >
            <TrashIcon className="text-red-500" size={14} />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="grid gap-4 p-0 border-none">
        <dl className="grid grid-cols-1 gap-2 text-sm">
          <div className="flex flex-row">
            <dt className="w-20 font-medium">Date</dt>
            <dd className="ml-auto">
              {format(activeInterview.date, "dd MMM yyyy HH:mm")}
            </dd>
          </div>
          <div className="flex flex-row">
            <dt className="w-20 font-medium">Type</dt>
            <dd className="ml-auto">{activeInterview.type}</dd>
          </div>
          <div className="flex flex-row">
            <dt className="w-20 font-medium">Format</dt>
            <dd className="ml-auto">{activeInterview.format}</dd>
          </div>

          <div className="flex flex-row">
            <dt className="w-20 font-medium">Duration</dt>
            <dd className="ml-auto">
              {activeInterview.duration} minutes
            </dd>
          </div>
          <div className="flex flex-row">
            <dt className="w-20 font-medium">Location</dt>
            <dd className="ml-auto">
              {activeInterview.locaton || "N/A"}
            </dd>
          </div>
        </dl>
        {/* Aditional Information */}
        <div className="grid gap-1.5">
          <div className="font-medium text-xl">
            Additional Information
          </div>
          <p className="text-sm leading-none">
            Please bring a photo ID and arrive 15 minutes early.
          </p>
        </div>
        {/* Note */}

        <div>
          <p className="mb-2 font-medium">Your notes:</p>
          {activeInterview?.note && (
            <NoteForm note={activeInterview.note} />
          )}
        </div>
      </CardContent>
    </Card>
  );
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
