import mermaid from "mermaid";

export const initMermaid = () => {
  mermaid.initialize({ startOnLoad: false });
};

export const convertToMarmeidSvg = async (): Promise<void> => {
  console.log("convertToMermaidSVG");
  await mermaid.run({
    querySelector: ".mermaid",
  });
};

// ダイアログを記載
export const drawDiaglam = async (mermaidText: string): Promise<void> => {
  var element = document.querySelector(".mermaid");
  const { svg, bindFunctions } = await mermaid.render("mermaid", mermaidText);
  if (element) {
    element.innerHTML = svg;
    bindFunctions?.(element);
  }
};
