import { ReactElement, useEffect } from "react";
import { convertToMarmeidSvg, initMermaid } from "../api/api";
import { useState } from "react";

const Content = (): ReactElement => {
  initMermaid();
  const [mermaidText, setMarmaidText] = useState<string>();
  useEffect(() => {
    // 選択文字列が存在する場合、図に変換
    if (mermaidText) convertToMarmeidSvg();
  }, [mermaidText]);

  const getSelectedText = () => {
    // const url = chrome.runtime.getURL("js/popup.html");
    // console.log(url);
    // window.open(url);
    chrome.runtime.sendMessage({ action: "openPopup" });
  };

  return (
    <>
      <section className="chart-area">
        {mermaidText ? <pre className="mermaid">{mermaidText}</pre> : <></>}
      </section>
      <section className="button-area">
        <input
          type="button"
          id="copy"
          value={"選択範囲を図に変換"}
          onClick={getSelectedText}
        ></input>
      </section>
    </>
  );
};

export default Content;
