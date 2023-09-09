import "../../styles/content/style.scss";
import mermaid from "mermaid";
import { MermaidRender } from "./MermaidRender";
import { isMermaidText } from "../api/api";
import { createRoot } from "react-dom/client";
import { extensionId } from "../constant";
import { idGenerator } from "../utility";

const test1 = `pre[lang="test"]:not(.unchanged):not([${extensionId}="processed"])`;
const test2 = `.lang-mermaid:not(.unchanged):not([${extensionId}="processed"])`;
const test3 = `#loom .loom_code:not(.unchanged):not([${extensionId}="processed"])`;

window.onload = () => {
  init();
};

// 初期処理
const init = () => {
  // Mermaidの初期設定
  mermaid.initialize({
    startOnLoad: false,
  });

  // Mermaidのレンダー処理
  if (document.body !== null) {
    new MutationObserver(renderMermaid).observe(document.body, {
      childList: true,
      subtree: true,
    });
  }

  // レンダー処理
  renderMermaid();
};

// レンダー処理
/**
 * 対象要素が存在しない場合
 1. 対象要素が存在しなければ、何もしない。
 2. 対象要素が存在するが、Mermaidテキストでなければ、何もしない

 * 対象要素が存在する場合
 1. idを生成
 2. 内部のテキストを取得
 3. Mermaidテキストである場合は、className=mermaid-targetがついた要素を差し込む
 4. Mermaidテキストをレンダリングし、svgの図を挿入する。
**/
const renderMermaid = async () => {
  // 該当要素取得
  const targetElement = document.querySelectorAll(test3);
  if (!targetElement) return;
  // レンダー
  targetElement.forEach((elem) => {
    const id = idGenerator.next().value;
    const mermaidText = elem.textContent;
    // mermaid変換が必要かどうかチェック
    if (mermaidText && isMermaidText(mermaidText)) {
      elem.setAttribute(extensionId, "processed");
      const root = createRoot(elem);
      root.render(
        <MermaidRender
          id={id}
          mermaidText={mermaidText}
          className={"mermaid-target"}
        />
      );
    }
  });
  // Mermaid図に変換
  await mermaid.run({
    nodes: document.querySelectorAll(`.mermaid-target`),
    suppressErrors: true,
  });
};
