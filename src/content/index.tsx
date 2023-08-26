import "../../styles/content/style.scss";
import mermaid from "mermaid";
import { renderMermaidDialog } from "./mermaid-render";

window.onload = async () => {
  await init();
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
