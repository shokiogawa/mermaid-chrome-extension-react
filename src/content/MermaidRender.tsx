import { RenderTarget } from "../types/RenderTarget";
import { useState } from "react";
import Modal from "./Modal ";

export const MermaidRender: React.FC<RenderTarget> = ({
  id,
  mermaidText,
  className,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const showDialogHandler = () => {
    setIsOpen(true);
  };

  const closeDialodHandler = () => {
    setIsOpen(false);
  };

  return (
    <>
      <div
        id={id}
        className={className}
        key={mermaidText}
        onClick={showDialogHandler}
      >
        {mermaidText}
      </div>
      {isOpen ? (
        <Modal mermaidText={mermaidText} onClick={closeDialodHandler} />
      ) : (
        <></>
      )}
    </>
  );
};
