import { createRoot } from "react-dom/client";
import Icon from "./Icon";
import { createdtagName } from "../constant";
import "../../styles/content/style.scss";

document.addEventListener("selectionchange", () => {
  removeCreatedTag();
  createTagName();
});

const removeCreatedTag = () => {
  const createdTagList = document.getElementsByTagName(createdtagName);
  if (createdTagList.length > 0) {
    for (let i = 0; i < createdTagList.length; i++) {
      createdTagList[i].remove();
    }
  }
};

const createTagName = () => {
  const selectedText = window.getSelection();
  if (selectedText && selectedText.toString().length > 0) {
    const oRange = selectedText.getRangeAt(0);
    const oRect = oRange.getBoundingClientRect();

    const container = document.createElement(createdtagName);
    document.body.after(container);

    createRoot(container).render(
      <Icon selectedText={selectedText.toString()} orect={oRect} />
    );
  }
};
