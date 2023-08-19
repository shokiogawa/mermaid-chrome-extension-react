chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  const url = chrome.runtime.getURL("js/popup.html");
  chrome.windows.create({
    url: url,
    type: "popup",
    focused: true,
    width: 400,
    height: 600,
    left: 100,
    top: 100,
  });
  chrome.runtime.sendMessage({ message: "バックグラウンドから送信" });
});
