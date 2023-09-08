import "../../styles/content/style.scss";
import mermaid from "mermaid";
import * as d3 from "d3";
import { addReactComponent } from "./MermaidRender";

window.onload = async () => {
  await init();
};

// 初期処理
const init = async (): Promise<void> => {
  // Mermaidの初期設定
  mermaid.initialize({
    startOnLoad: false,
  });

  // Mermaidのレンダー処理
  if (document.body !== null) {
    new MutationObserver(addReactComponent).observe(document.body, {
      childList: true,
      subtree: true,
    });
  }
  addReactComponent();
};
