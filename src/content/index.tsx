import { createRoot } from "react-dom/client";
import Main from "./Dialog";

// popupから要請を受け付け
// chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
//   // 画面で選択されている部分を文字列で取得する
//   if (window.getSelection) {
//     const selection = window.getSelection()?.toString();
//     sendResponse(selection);
//   }
// });

const container = document.createElement("my-extension-root");
document.body.after(container);
createRoot(container).render(<Main />);
