import React, { useEffect, useState } from "react";
import { convertToMarmeidSvg, initMermaid } from "../api/api";

const Popup: React.FC = () => {
  const [mermaidText, setMarmaidText] = useState<string>();

  // マーメイド初期化
  initMermaid();

  useEffect(() => {
    requestSelectTextToScriptHandler();
    // 選択文字列が存在する場合、図に変換
    if (mermaidText) convertToMarmeidSvg();
  }, [mermaidText]);

  // scriptにメッセージを要求
  const requestSelectTextToScriptHandler = () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(
        tabs[0].id ?? 0,
        { message: "選択範囲頂戴" },
        (selectedText: string) => {
          if (!selectedText) {
            return;
          } else {
            // 選択文字列を格納
            setMarmaidText(selectedText);
          }
        }
      );
    });
  };
  return (
    <main>
      <h1>Mermaid図</h1>
      <section className="chart-area">
        {mermaidText ? <pre className="mermaid">{mermaidText}</pre> : <></>}
      </section>
    </main>
  );
};

export default Popup;
