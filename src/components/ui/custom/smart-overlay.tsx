import React from "react";

import { Modal } from "@/components/ui/custom/modal";
import ControllableDrawer from "@/components/ui/custom/controllable-drawer";
import { useWindowSize } from "usehooks-ts";

interface SmartOverlayProps {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
  onConfirm?: () => void;
  title: string;
  description: string;
}

export default function SmartOverlay({
  isOpen,
  children,
  onClose,
  onConfirm,
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
          onConfirm={onConfirm}
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
          onConfirm={onConfirm}
        >
          {children}
        </Modal>
      )}
    </>
  );
}
