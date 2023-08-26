import mermaid from "mermaid";
const extensionId = "mermaid-diagram-renderer";

const idGenerator = (function* () {
  let i = 1;
  while (true) {
    yield `${extensionId}-${i}`;
    ++i;
  }
})();

// Mermaid図をレンダー
export const renderMermaidDialog = async () => {
  console.log("start render");
  const targetElements = document.querySelectorAll(
    `pre[lang="test"]:not(.unchanged):not([${extensionId}="processed"])`
  );
  targetElements.forEach(async (element) => {
    // svg挿入用のdivタグ作成
    const container = document.createElement("div");
    container.setAttribute(extensionId, "processed");

    const clonedCodeNode = element.querySelector("code")!.cloneNode(true);
    const targetText = clonedCodeNode.textContent;

    if (targetText) {
      if (element.parentElement) element.parentElement.replaceWith(container);
      const { svg, bindFunctions } = await mermaid.render(
        idGenerator.next().value,
        targetText
      );
      container.innerHTML = svg;
      bindFunctions?.(container);
    }
  });
};
