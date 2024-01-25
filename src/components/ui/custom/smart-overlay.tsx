import React from "react";

import { Modal } from "@/components/ui/custom/modal";
import ControllableDrawer from "@/components/ui/custom/controllable-drawer";
import { useWindowSize } from "usehooks-ts";

interface SmartOverlayProps {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description: string;
}

export default function SmartOverlay({
  isOpen,
  children,
  onClose,
  title,
  description,
}: SmartOverlayProps) {
  const { width } = useWindowSize();
  const isMobile = width < 768;

  return (
    <>
      {isMobile ? (
        <ControllableDrawer
          title={title}
          description={description}
          isOpen={isOpen}
          onClose={onClose}
        >
          {children}
        </ControllableDrawer>
      ) : (
        <Modal
          title={title}
          description={description}
          isOpen={isOpen}
          onClose={onClose}
        >
          {children}
        </Modal>
      )}
    </>
  );
}
