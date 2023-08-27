import { createdtagName } from "../constant";
import { createRoot } from "react-dom/client";
const targetFirstMark = "```mermaid";
const targetLastMark = "```";

export const sendMessageInit = () => {
  console.log("sendMessage");
  const textArea = document.getElementById("gollum-editor-body");
  textArea?.addEventListener("input", changeEvent);
};

const changeEvent = (): void => {
  console.log("変更を検知");
  const textArea: HTMLInputElement = <HTMLInputElement>(
    document.getElementById("gollum-editor-body")
  );
  if (textArea) {
    const stringList = textArea.value.split(targetFirstMark).map((text) => {
      return text.substring(0, text.indexOf("```"));
    });
    stringList.shift();
    sendMessage(stringList);
  }
};

const sendMessage = (mermaidTextList: string[]) => {
  chrome.runtime.sendMessage({ mermaidTextList: mermaidTextList });
};

type Props = {
  selectedText: string;
  orect: DOMRect;
};

// const Icon: React.FC<Props> = ({ selectedText, orect }) => {
//   const sendSelectedText = () => {
//     chrome.runtime.sendMessage({ selectedText: selectedText });
//   };
//   return (
//     <>
//       <div
//         className="hover-area"
//         style={{
//           left: window.scrollX + orect.right,
//           top: window.scrollY + orect.bottom,
//         }}
//       >
//         <button className="button" onClick={sendSelectedText}>
//           選択した文字列を変換
//         </button>
//       </div>
//     </>
//   );
// };

const removeCreatedTag = () => {
  const createdTagList = document.getElementsByTagName(createdtagName);
  if (createdTagList.length > 0) {
    for (let i = 0; i < createdTagList.length; i++) {
      createdTagList[i].remove();
    }
  }
};

// const createTagName = () => {
//   const selectedText = window.getSelection();
//   if (selectedText && selectedText.toString().length > 0) {
//     const oRange = selectedText.getRangeAt(0);
//     const oRect = oRange.getBoundingClientRect();

//     const container = document.createElement(createdtagName);
//     document.body.after(container);

//     createRoot(container).render(
//       <Icon selectedText={selectedText.toString()} orect={oRect} />
//     );
//   }
// };
