import mermaid from "mermaid";

// 初期化
export const initMermaid = () => {
  try {
    mermaid.initialize({ startOnLoad: false });
  } catch (err) {
    console.error(err);
  }
};

export const convertToMarmeidSvg = async (): Promise<void> => {
  await mermaid.run({
    querySelector: ".mermaid",
  });
};

// ダイアログを記載
export const drawDiaglam = async (
  mermaidText: string,
  targetClassname: string
): Promise<void> => {
  try {
    var element = document.querySelector(`.${targetClassname}`);
    const { svg, bindFunctions } = await mermaid.render(
      targetClassname,
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
