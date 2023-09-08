import { useEffect } from "react";
import mermaid from "mermaid";
import { attachD3, renderMermaid } from "../api/api";

type Props = {
  mermaidText: string;
  onClick: React.MouseEventHandler<HTMLDivElement>;
};

const Modal: React.FC<Props> = ({ mermaidText, onClick }) => {
  // レンダリング処理
  const render = async (): Promise<void> => {
    await renderMermaid(".mermaid-dialog");
    attachD3(".mermaid-dialog svg");
    var target = document.querySelector(".mermaid-dialog svg") as HTMLElement;
    target.style.maxWidth = "100%";
  };
  useEffect(() => {
    render();
  }, []);
  return (
    <div className="dialog-area" onClick={onClick}>
      <div className="mermaid-dialog">{mermaidText}</div>
    </div>
  );
};

export default Modal;
