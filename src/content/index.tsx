import "../../styles/content/style.scss";
import mermaid from "mermaid";
import { renderMermaidDialog } from "./mermaid-render";
import { sendMessageInit } from "./Icon";

window.onload = async () => {
  await init();
  sendMessageInit();
};

// 初期処理
const init = async (): Promise<void> => {
  // Mermaidの初期設定
  mermaid.initialize({
    startOnLoad: false,
    deterministicIds: true,
  });

  // Mermaidのレンダー処理
  if (document.body !== null) {
    new MutationObserver(renderMermaidDialog).observe(document.body, {
      childList: true,
      subtree: true,
    });
  }
  await renderMermaidDialog();
};
