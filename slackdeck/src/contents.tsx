import React from 'react';
import ReactDOM from 'react-dom';
import "./style/contents.scss";
import "./style/column.scss";
import "./style/deck.scss";
import { Column } from './components/Column';
import { Deck } from './components/Deck';

// Slack body
const body = document.body;
body.id = "main-body";

// Deck
const deckElement = document.createElement("div");
deckElement.id = "deck-element";
ReactDOM.render(<Deck />, deckElement);

// Column wrapper
const wrapper = document.createElement("div");
wrapper.id = "wrapper";
// Columns
// const column1 = document.createElement("div");
// wrapper.appendChild(column1);
// ReactDOM.render(<Column />, column1);

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
