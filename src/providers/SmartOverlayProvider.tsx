import CreateJASmartOverlay from "@/components/smart-overlays/CreateJASmartOverlay";
import EditJASmartOverlay from "@/components/smart-overlays/EditJASmartOverlay";

export default function SmartOverlayProvider() {
  return (
    <>
      <CreateJASmartOverlay />
      <EditJASmartOverlay />
    </>
  );
}
