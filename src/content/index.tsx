import "../../styles/content/style.scss";
import mermaid from "mermaid";
import { renderMermaidDialog, attachD3 } from "./mermaid-render";
import { sendMessageInit } from "./Icon";
import * as d3 from "d3";

window.onload = async () => {
  await init();
  sendMessageInit();
  setTimeout(attachD3, 1000);
  // window.addEventListener("load", function () {
  // console.log("やあ");
  // setTimeout(() => {
  //   const svgs = d3.selectAll<SVGSVGElement, unknown>(".mermaid svg");
  //   console.log(svgs);
  //   svgs.each(function () {
  //     console.log("eachの中");
  //     const svg = d3.select(this);
  //     console.log(svg);
  //     svg.html("<g>" + svg.html() + "</g>");
  //     const inner = svg.select<SVGGElement>("g");
  //     const zoom = d3
  //       .zoom<SVGSVGElement, unknown>()
  //       .on("zoom", function (event) {
  //         inner.attr("transform", event.transform);
  //       });
  //     svg.call(zoom);
  //   });
  // }, 5000);
  // });
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
