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
        className="hover-area"
        style={{
          left: window.scrollX + orect.right,
          top: window.scrollY + orect.bottom,
        }}
      >
        <button className="button" onClick={sendSelectedText}>
          選択した文字列を変換
        </button>
      </div>
    </>
  );
};

export default Icon;
