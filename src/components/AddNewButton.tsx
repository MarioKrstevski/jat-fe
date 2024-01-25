import { PlusCircleIcon } from "lucide-react";
import { Button } from "./ui/button";
import { useCreateNewModal } from "@/hooks/modals/useCreateNewModal";
import { useCreateNewDrawer } from "@/hooks/drawers/useCreateNewDrawer";
import { useMediaQuery } from "usehooks-ts";
import { useDialogControl } from "@/hooks/smart-overlays/useDialogControl";

export default function AddNewButton() {
  const createJAModal = useDialogControl(
    (state) => state.modals["createJA"]
  );
  const closeCreateJAModal = useDialogControl(
    (state) => state.closeModal
  );
  const openModal = useDialogControl((state) => state.openModal);

  const isDesktop = useMediaQuery("(min-width: 768px)");

  function handleAddNew() {
    openModal("createJA");
  }
  return (
    <Button onClick={handleAddNew} className="ml-2" size={"sm"}>
      Add new <PlusCircleIcon size={18} className="ml-1 " />
    </Button>
  );
}
