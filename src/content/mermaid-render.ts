import mermaid from "mermaid";
import * as d3 from "d3";

const extensionId = "mermaid-diagram-renderer";

type RenderTarget = {
  // id
  id: string;
  // mermaid図に置き換える要素を指定
  replaceElement: HTMLElement;
  // マーメイドテキストを指定
  mermaidText: string;
};

// Mermaid図をレンダー
export const renderMermaidDialog = async () => {
  console.log("start render");
  const rendertargets: RenderTarget[] = Array.from(
    document.querySelectorAll(
      `pre[lang="test"]:not(.unchanged):not([${extensionId}="processed"])`
    )
  ).map((element) => {
    const id = idGenerator.next().value;
    const replaceElement = element.parentElement!;
    const mermaidText = element.querySelector("code")!.innerText;
    return { id, replaceElement, mermaidText };
  });

  // 各要素をレンダリング
  rendertargets.forEach(async (rendertarget) => {
    await render(rendertarget);
  });
};

// 引数の要素をレンダリングする。
const render = async (targetElement: RenderTarget): Promise<void> => {
  // mermaidの図を挿入する要素を作成
  const container = document.createElement("div");
  container.setAttribute(extensionId, "processed");
  container.classList.add("mermaid");

  targetElement.replaceElement.replaceWith(container);
  try {
    const { svg, bindFunctions } = await mermaid.render(
      targetElement.id,
      targetElement.mermaidText
    );
    // 画像を挿入
    container.innerHTML = svg;
    // 変換処理
    bindFunctions?.(container);
  } catch (err: any) {
    console.error(err);
    if (err instanceof Error) {
      container.innerText = err.message;
    } else {
      container.innerText =
        "変換できませんでした、エラーログまた、構文を確認してください";
    }
  }
};
// id付与
const idGenerator = (function* () {
  let i = 1;
  while (true) {
    yield `${extensionId}-${i}`;
    ++i;
  }
})();

export const attachD3 = () => {
  console.log("attachD3");
  const svgs = d3.selectAll<SVGSVGElement, unknown>(".mermaid svg");
  console.log(svgs);
  svgs.each(function () {
    const svg = d3.select(this);
    console.log(svg);
    svg.html("<g>" + svg.html() + "</g>");
    const inner = svg.select<SVGGElement>("g");
    const zoom = d3.zoom<SVGSVGElement, unknown>().on("zoom", function (event) {
      inner.attr("transform", event.transform);
    });
    svg.call(zoom);
  });
};
// const targetFirstMark = "'''mermaid";
// const targetLastMark = "'''";
// export const renderMermaidForWiki = async (): Promise<void> => {
//   // wiki内のpタグを全て取得する。
//   const targetElementTentatives = Array.from(document.querySelectorAll("p"));
//   // pタグが存在しない場合は、早期リターン
//   if (!targetElementTentatives) return;

//   // mermaidのデータをフィルタリング
//   const targetElements: TargetElement[] = targetElementTentatives
//     .map((element: HTMLParagraphElement) => {
//       const targetText = element.innerText;
//       if (isMermaidText(targetText)) {
//         const text = shapingText(targetText);
//         return { element, text };
//       }
//     })
//     .filter(
//       (element): element is NonNullable<typeof element> => element !== undefined
//     );
//   // データが存在しなければ何もしない。
//   if (!targetElements) return;

//   // レンダー処理
//   targetElements.forEach(async (targetElement: TargetElement) => {
//     // mermaidの図を挿入する要素を作成
//     const container = document.createElement("div");
//     container.setAttribute(extensionId, "processed");

//     console.log(targetElement.text);
//     // 入れ替え
//     targetElement.element.replaceWith(container);
//     try {
//       const { svg, bindFunctions } = await mermaid.render(
//         idGenerator.next().value,
//         targetElement.text
//       );
//       // 画像を挿入
//       container.innerHTML = svg;
//       // 変換処理
//       bindFunctions?.(container);
//     } catch (err: any) {
//       console.error(err);
//       if (err instanceof Error) {
//         container.innerText = err.message;
//       } else {
//         container.innerText =
//           "変換できませんでした、エラーログまた、構文を確認してください";
//       }
//     }
//   });
// };

// mermaid記法であるかどうかの計算
// const isMermaidText = (targetText: string): boolean => {
//   if (!targetText) return false;
//   return (
//     targetText.startsWith(targetFirstMark) &&
//     targetText.endsWith(targetLastMark)
//   );
// };

// // ```などの不要な文字列を削除
// const shapingText = (targetText: string): string => {
//   return targetText.slice(10).slice(0, -3);
// };
