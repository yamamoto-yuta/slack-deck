import React, { useEffect } from "react";
import { Tooltip, Toast, Popover } from 'bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee } from '@fortawesome/free-solid-svg-icons'
import "./Popup.scss";

export default function Popup() {
  useEffect(() => {
    // Example of how to send a message to eventPage.ts.
    chrome.runtime.sendMessage({ popupMounted: true });
  }, []);

  return (
    <div className="popupContainer">
      Hello, world!
      <button className="btn btn-primary"><FontAwesomeIcon icon={faCoffee} />bar</button>
    </div>
  );
}
