import { useCreateNewDrawer } from "@/hooks/drawers/useCreateNewDrawer";
import ControllableDrawer from "../ui/custom/controllable-drawer";

export default function CreateNewJobApplicationDrawer() {
  const createNewDrawer = useCreateNewDrawer();

  return (
    <ControllableDrawer
      title="Create New Job Application"
      description="Create a new job application"
      isOpen={createNewDrawer.isOpen}
      onClose={createNewDrawer.onClose}
    >
      <div className="h-72">form stuff</div>
    </ControllableDrawer>
  );
}
