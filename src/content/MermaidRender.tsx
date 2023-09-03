import { createRoot } from "react-dom/client";
const extensionId = "mermaid-diagram-renderer";

const MermaidRender = () => {
  return <></>;
};

export default MermaidRender;

// 該当要素取得
const targetElement = document.querySelectorAll(
  `pre[lang="test"]:not(.unchanged):not([${extensionId}="processed"])`
);

// レンダー
targetElement.forEach((elem) => {
  const root = createRoot(elem);
  root.render(<MermaidRender />);
});
