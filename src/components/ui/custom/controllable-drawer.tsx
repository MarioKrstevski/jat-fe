import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "../button";

interface ControllableDrawerProps {
  title: string;
  description: string;
  isOpen: boolean;
  onClose: () => void;
  onConfirm?: () => void;
  children?: React.ReactNode;
}

export default function ControllableDrawer({
  title,
  description,
  isOpen,
  onClose,
  onConfirm,
  children,
}: ControllableDrawerProps) {
  return (
    <>
      <Drawer
        modal
        shouldScaleBackground
        open={isOpen}
        onClose={onClose}
        onOpenChange={(e) => {
          if (e === false) {
            onClose();
          }
        }}
      >
        {/* <DrawerTrigger>Open</DrawerTrigger> */}
        <DrawerContent className="max-h-[90%] ">
          <DrawerHeader>
            <DrawerTitle>{title}</DrawerTitle>
            <DrawerDescription>{description}</DrawerDescription>
          </DrawerHeader>
          <div className="p-4 pb-0 overflow-y-auto">{children}</div>
          {onConfirm && (
            <DrawerFooter>
              <Button onClick={onConfirm}>Submit</Button>
              <DrawerClose asChild>
                <Button variant="outline" onClick={onClose}>
                  Cancel
                </Button>
              </DrawerClose>
            </DrawerFooter>
          )}
        </DrawerContent>
      </Drawer>
    </>
  );
}
