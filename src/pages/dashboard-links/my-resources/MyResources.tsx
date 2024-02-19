import { api } from "@/api/backend";
import { useQuery } from "@tanstack/react-query";
import MyResourcesList from "./components/MyResourcesList";
import { Button } from "@/components/ui/button";
import { useDialogControl } from "@/hooks/useDialogControl";
import CreateMyResourceSmartOverlay from "./components/modals/CreateMyResourceSmartOverlay";
import EditMyResourceSmartOverlay from "./components/modals/EditMyResourceSmartOverlay";

interface MyResourcesProps {}
export default function MyResources({}: MyResourcesProps) {
  const dialogControl = useDialogControl();
  const { data: myResources } = useQuery({
    queryKey: ["myResources"],
    queryFn: api.myResources.getMyResources,
  });

  if (!myResources) return <div>Loading...</div>;

  return (
    <div>
      <CreateMyResourceSmartOverlay />
      <EditMyResourceSmartOverlay />
      MyResources works:
      <Button
        onClick={() => {
          dialogControl.openModal("createMyResource");
        }}
      >
        {" "}
        Add myResource
      </Button>
      <MyResourcesList myResources={myResources} />
    </div>
  );
}
