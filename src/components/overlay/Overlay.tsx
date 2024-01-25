import React from "react";

import { Modal } from "@/components/ui/custom/modal";
import ControllableDrawer from "@/components/ui/custom/controllable-drawer";
import { useIsClient, useWindowSize } from "usehooks-ts";

interface OverlayProps {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description: string;
}

const Overlay = ({
  children,
  isOpen,
  onClose,
  title,
  description,
}: OverlayProps) => {
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
};

export default Overlay;
