import { PlusCircleIcon } from "lucide-react";
import { Button } from "./ui/button";
import { useCreateNewModal } from "@/hooks/modals/useCreateNewModal";
import { useCreateNewDrawer } from "@/hooks/drawers/useCreateNewDrawer";
import { useMediaQuery } from "usehooks-ts";

export default function AddNewButton() {
  const createNewModal = useCreateNewModal();
  const createNewDrawer = useCreateNewDrawer();

  const isDesktop = useMediaQuery("(min-width: 768px)");

  function handleAddNew() {
    if (isDesktop) {
      createNewModal.onOpen();
    } else {
      createNewDrawer.onOpen();
    }
  }
  return (
    <Button onClick={handleAddNew} className="ml-2" size={"sm"}>
      Add new <PlusCircleIcon size={18} className="ml-1 " />
    </Button>
  );
}
