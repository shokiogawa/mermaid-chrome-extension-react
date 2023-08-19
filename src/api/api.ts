import mermaid from "mermaid";

export const initMermaid = () => {
  mermaid.initialize({ startOnLoad: false });
};

export const convertToMarmeidSvg = async (): Promise<void> => {
  await mermaid.run({
    querySelector: ".mermaid",
  });
};
