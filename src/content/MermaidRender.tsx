import { createRoot } from "react-dom/client";
import { RenderTarget } from "../types/RenderTarget";
import mermaid from "mermaid";
import { useEffect, useState } from "react";
import { idGenerator } from "../utility";
import Modal from "./Modal ";
const extensionId = "mermaid-diagram-renderer";
const test1 = `pre[lang="test"]:not(.unchanged):not([${extensionId}="processed"])`;
const test2 = `.lang-mermaid:not(.unchanged):not([${extensionId}="processed"])`;

const MermaidRender: React.FC<RenderTarget> = ({
  id,
  mermaidText,
  className,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const showDialogHandler = () => {
    console.log(mermaidText);
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

export const addReactComponent = async () => {
  // 該当要素取得
  const targetElement = document.querySelectorAll(test2);

  // レンダー
  targetElement.forEach((elem) => {
    const id = idGenerator.next().value;
    const mermaidText = elem.querySelector("code")!.innerText;
    elem.setAttribute(extensionId, "processed");
    const root = createRoot(elem);
    root.render(
      <MermaidRender
        id={id}
        mermaidText={mermaidText}
        className={"mermaid-target"}
      />
    );
  });

  await mermaid.run({
    nodes: document.querySelectorAll(`.mermaid-target`),
  });
};
