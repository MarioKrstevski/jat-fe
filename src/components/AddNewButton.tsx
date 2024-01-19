import { PlusCircleIcon } from "lucide-react";
import { Button } from "./ui/button";
import { useCreateNewModal } from "@/hooks/useCreateNewModal";

export default function AddNewButton() {
  const createNewModal = useCreateNewModal();
  function handleAddNew() {
    createNewModal.onOpen();
  }
  return (
    <Button onClick={handleAddNew} className="ml-2" size={"sm"}>
      Add new <PlusCircleIcon size={18} className="ml-1 " />
    </Button>
  );
}
