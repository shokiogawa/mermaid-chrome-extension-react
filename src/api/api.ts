import mermaid from "mermaid";
import * as d3 from "d3";

// 1つのみ変換する
export const renderMermaid = async (target: string): Promise<void> => {
  await mermaid.run({
    querySelector: target,
  });
};

// 1つづつ図に変換する
export const drawDiaglamOne = async (
  mermaidText: string,
  target: string
): Promise<void> => {
  try {
    var element = document.querySelector(`#${target}`);
    const { svg, bindFunctions } = await mermaid.render(
      `${target}-svg`,
      mermaidText
    );
    if (element) {
      element.innerHTML = svg;
      bindFunctions?.(element);
    }
  } catch (err) {
    console.error(err);
  }
};

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
