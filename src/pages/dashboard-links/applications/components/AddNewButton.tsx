import { PlusCircleIcon } from "lucide-react";
import { Button } from "../../../../components/ui/button";
import { useDialogControl } from "@/hooks/useDialogControl";

export default function AddNewButton() {
  const dialogControl = useDialogControl();

  function handleAddNew() {
    dialogControl.openModal("createJA");
  }
  return (
    <Button onClick={handleAddNew} className="ml-2" size={"sm"}>
      Add new <PlusCircleIcon size={18} className="ml-1 " />
    </Button>
  );
}
