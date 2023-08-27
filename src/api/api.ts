import mermaid from "mermaid";
const extensionId = "mermaid-diagram-renderer";
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
export const drawDiaglam = async (targetClassname: string): Promise<void> => {
  var targetElements = document.querySelectorAll(`.${targetClassname}`);
  targetElements.forEach((elem) => {
    console.log(elem);
  });
  // targetElements.forEach(async (element) => {
  //   console.log(element);
  //   const mermaidText = element.textContent;
  //   console.log(mermaidText);

  //   if (mermaidText) {
  //     try {
  //       const { svg, bindFunctions } = await mermaid.render(
  //         idGenerator.next().value,
  //         mermaidText
  //       );
  //       element.innerHTML = svg;
  //       bindFunctions?.(element);
  //     } catch (err: any) {
  //       element.innerHTML = mermaidText;
  //     }
  //   }
  // });
};

const idGenerator = (function* () {
  let i = 1;
  while (true) {
    yield `${extensionId}-${i}`;
    ++i;
  }
})();
