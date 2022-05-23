import React from 'react';
import ReactDOM from 'react-dom';
import "./style/contents.scss";
import "./style/column.scss";
import "./style/deck.scss";
import { Deck } from './components/Deck';
import { ColumnConfig, saveColumns } from './shared/column';


// Column list
let columnList: ColumnConfig[] = [];

// Autosave interval
let autoSaveInterval;
const startAutoSave = () => {
  autoSaveInterval = setInterval(() => {
    saveColumns(columnList);
    console.log("Start autosave.");
  }, 1000);
};
const stopAutoSave = () => {
  clearInterval(autoSaveInterval);
  console.log("Stop autosave.");
};

// hidden プロパティおよび可視性の変更イベントの名前を設定
const hidden = "hidden";
const visibilityChange = "visibilitychange";

const handleVisibilityChange = () => {
  if (document[hidden]) {
    stopAutoSave();
    console.log("hidden");
  } else {
    startAutoSave();
    console.log("visible");
  }
}

// ブラウザーが addEventListener または Page Visibility API をサポートしない場合に警告.
if (typeof document.addEventListener === "undefined" || hidden === undefined) {
  console.log("This demo requires a browser, such as Google Chrome or Firefox, that supports the Page Visibility API.");
} else {
  console.log("enable");
  // Page Visibility の変更を扱う
  document.addEventListener(visibilityChange, handleVisibilityChange, false);
}


// Slack body
const body = document.body;
body.id = "main-body";

// Deck
const deckElement = document.createElement("div");
deckElement.id = "deck-element";
ReactDOM.render(<Deck columnList={columnList} />, deckElement);

// Column wrapper
const wrapper = document.createElement("div");
wrapper.id = "wrapper";

// Main element
const mainElement = document.createElement("div");
mainElement.id = "main-element";
mainElement.appendChild(body);
mainElement.appendChild(wrapper);

// New body
const newBody = document.createElement("body");
newBody.id = "new-body";
newBody.appendChild(deckElement);
newBody.appendChild(mainElement);
document.documentElement.appendChild(newBody);
