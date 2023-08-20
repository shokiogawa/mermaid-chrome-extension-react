type Props = {
  selectedText: string;
  orect: DOMRect;
};

const Icon: React.FC<Props> = ({ selectedText, orect }) => {
  const sendSelectedText = () => {
    chrome.runtime.sendMessage({ selectedText: selectedText });
  };
  return (
    <>
      <div
        style={{
          position: "absolute",
          left: window.scrollX + orect.right,
          top: window.scrollY + orect.bottom,
          zIndex: 2147483550,
        }}
      >
        <button
          style={{
            backgroundColor: "black",
            color: "white",
            padding: "10px",
            borderRadius: "100px",
          }}
          onClick={sendSelectedText}
        >
          選択した文字列を変換
        </button>
      </div>
    </>
  );
};

export default Icon;
