import "../../styles/content/style.scss";
import mermaid from "mermaid";
import { MermaidRender } from "./MermaidRender";
import { isMermaidText, targetUrlBucket } from "../api/api";
import { createRoot } from "react-dom/client";
import { extensionId } from "../constant";
import { idGenerator, wildcardToRegex } from "../utility";
import { TargetUrl, TargetUrlBucket } from "../types/TargetUrl";

const base = `:not(.unchanged):not([${extensionId}="processed"])`;
const test1 = `pre[lang="test"]:not(.unchanged):not([${extensionId}="processed"])`;
const test2 = `.lang-mermaid:not(.unchanged):not([${extensionId}="processed"])`;
const test3 = `#loom .loom_code:not(.unchanged):not([${extensionId}="processed"])`;

window.onload = async () => {
  const targetUrl = await checkCurrentUrlIsTargetUrl();

  if (!targetUrl) return;
  init(targetUrl);
};

/**
 * 現在のURLが対象のURLであるかどうかのチェックを行う。
 * 対象のUrlの場合、Urlと要素を返す。対象のURLではない場合、nullを返す。
 * @returns TargetUrl or null
 */
const checkCurrentUrlIsTargetUrl = async (): Promise<TargetUrl | null> => {
  const currentUrl = location.href;
  const bucket: TargetUrlBucket = await targetUrlBucket.get();
  if (!bucket.targetUrls) return null;

  // 優先度1: マッチする場合を検索
  const targetUrl = bucket.targetUrls.find((targetUrl: TargetUrl) => {
    return targetUrl.url === currentUrl;
  });

  // 優先度2: ワイルドカードを検索
  if (!targetUrl) {
    const targetUrlWildCard = bucket.targetUrls.find((targetUrl: TargetUrl) => {
      const regex = wildcardToRegex(targetUrl.url);
      return regex.test(currentUrl);
    });
    if (!targetUrlWildCard) return null;
    return targetUrlWildCard;
  }

  return targetUrl;
};

// 初期処理
const init = (targetUrl: TargetUrl) => {
  // Mermaidの初期設定
  mermaid.initialize({
    startOnLoad: false,
  });

  // Mermaidのレンダー処理
  if (document.body !== null) {
    const callback = (targetUrl: TargetUrl) => {
      return (mutationsList: MutationRecord[], observer: MutationObserver) => {
        // renderMermaidメソッドを呼び出し、引数argを渡す
        renderMermaid(targetUrl);
      };
    };
    new MutationObserver(callback(targetUrl)).observe(document.body, {
      childList: true,
      subtree: true,
    });
  }

  // レンダー処理
  renderMermaid(targetUrl);
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
const renderMermaid = async (targetUrl: TargetUrl) => {
  // 該当要素取得
  const targetElement = document.querySelectorAll(
    `${targetUrl.element}${base}`
  );
  if (targetElement.length !== 0) {
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
  }
  await mermaid.run({
    nodes: document.querySelectorAll(`.mermaid-target`),
    suppressErrors: true,
  });
};
