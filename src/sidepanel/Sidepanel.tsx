import React, { useEffect, useState } from "react";
import { initMermaid, drawDiaglam } from "../api/api";
import { targetClassName } from "../constant";

const Sidepanel: React.FC = () => {
  // マーメイド初期化
  initMermaid();
  // scriptからメッセージを取得
  const requestSelectTextToScriptHandler = () => {
    chrome.runtime.onMessage.addListener(function (
      message,
      sender,
      sendResponse
    ) {
      if (message.selectedText) {
        setMarmaidText(message.selectedText);
      }
    });
  };
  requestSelectTextToScriptHandler();

  const [mermaidText, setMarmaidText] = useState<string>();

  useEffect(() => {
    // 選択文字列が存在する場合、図に変換
    if (mermaidText) drawDiaglam(mermaidText, targetClassName);
  }, [mermaidText]);

  return (
    <main>
      <h1>Mermaid図</h1>
      <section className="chart-area">
        {mermaidText ? (
          <pre className={targetClassName}>{mermaidText}</pre>
        ) : (
          <></>
        )}
      </section>
    </main>
  );
};

export default Sidepanel;
