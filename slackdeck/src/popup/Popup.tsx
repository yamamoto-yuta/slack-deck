import React, { useEffect, useState } from "react";
import { Tooltip, Toast, Popover } from 'bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee } from '@fortawesome/free-solid-svg-icons'
import { ColumnConfig } from "../Contract";
import "./Popup.scss";

const WIDTH_OPTION_LIST = [
  { text: "Narrow", value: "300px" },
  { text: "Medium", value: "500px" },
  { text: "Wide", value: "700px" },
];

const DEFAULT_WIDTH_OPTION_INDEX = 1;
const DEFAULT_COLUMN: ColumnConfig = {
  width: WIDTH_OPTION_LIST[DEFAULT_WIDTH_OPTION_INDEX].value,
  url: "",
};

export default function Popup() {
  const [newColDefaultWidoptionState, setNewColDefaultWidoptionState] = useState<string>(DEFAULT_COLUMN.width);
  const [newColDefaultUrl, setNewColDefaultUrl] = useState<string>(DEFAULT_COLUMN.url);

  useEffect(() => {
    chrome.storage.sync.get(
      ['newColDefaultConfig'],
      function (value) {
        if (value.newColDefaultConfig) {
          setNewColDefaultWidoptionState(value.newColDefaultConfig.width);
          setNewColDefaultUrl(value.newColDefaultConfig.url);
        }
      }
    );

    // Example of how to send a message to eventPage.ts.
    chrome.runtime.sendMessage({ popupMounted: true });
  }, []);

  const onNewColDefaultConfigSubmit = (width: string, url: string) => {
    let newColDefaultConfig: ColumnConfig = {
      width: width,
      url: url,
    };
    chrome.storage.sync.set({ newColDefaultConfig: newColDefaultConfig }, function () { });
  }

  return (
    <div className="container-fluid my-2 popupContainer">
      <h3>Add new column</h3>
      <p>Set URL and column width when you add new column.</p>
      <form id="newColDefaultConfig" className="flex-box my-1">
        <select
          id="newColDefaultWid"
          className="form-select mx-1"
          value={newColDefaultWidoptionState}
          onChange={(e) => (setNewColDefaultWidoptionState(e.target.value))}
        >
          {WIDTH_OPTION_LIST.map((option) => (
            <option
              value={option.value}
              selected={newColDefaultWidoptionState === option.value}
            >{option.text}</option>
          ))}
        </select>
        <input
          type="text"
          id="newColDefaultUrl"
          className="form-control mx-1"
          value={newColDefaultUrl}
          onChange={(e) => setNewColDefaultUrl(e.target.value)}
        />
        <button
          id="newColDefaultConfigSubmit"
          className="btn btn-primary mx-1"
          onClick={() => onNewColDefaultConfigSubmit(newColDefaultWidoptionState, newColDefaultUrl)}
        >Submit</button>
      </form>
    </div>
  );
}
