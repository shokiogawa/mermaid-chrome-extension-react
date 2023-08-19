import { ReactElement, useEffect } from "react";

const Content = (): ReactElement => {
  // 選択テキストをsidepanelに送信
  const getSelectedText = () => {
    if (window.getSelection) {
      const selectedText = window.getSelection()?.toString();
      chrome.runtime.sendMessage({ selectedText: selectedText });
    }
  };

  return (
    <>
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
