import mermaid from "mermaid";
import * as d3 from "d3";

/**
 【概要】Mermaidテキストかどうかのチェック
 **/
export const isMermaidText = (text: string): string | null => {
  try {
    return mermaid.detectType(text);
  } catch (err) {
    return null;
  }
};

/**
 【概要】Mermaidの図に変換
 **/
export const renderMermaid = async (target: string): Promise<void> => {
  await mermaid.run({
    querySelector: target,
  });
};

/**
 【概要】引数の要素に対して、svg図を拡大縮小処理を追加
 **/
export const attachD3 = (target: string) => {
  const svgs = d3.selectAll<SVGSVGElement, unknown>(target);
  svgs.each(function () {
    const svg = d3.select(this);
    svg.html("<g>" + svg.html() + "</g>");
    const inner = svg.select<SVGGElement>("g");
    const zoom = d3.zoom<SVGSVGElement, unknown>().on("zoom", function (event) {
      inner.attr("transform", event.transform);
    });
    svg.call(zoom);
  });
};
