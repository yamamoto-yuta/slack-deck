import React from 'react';
import ReactDOM from 'react-dom';
import "./style/contents.scss";
import "./style/column.scss";
import "./style/deck.scss";
import { Deck } from './components/Deck';
import { ColumnConfig, saveColumns } from './shared/column';


// Column list
let columnList: ColumnConfig[] = [];

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
