import React, { useEffect } from "react";
import { Tooltip, Toast, Popover } from 'bootstrap';
import "./Popup.scss";

export default function Popup() {
  useEffect(() => {
    // Example of how to send a message to eventPage.ts.
    chrome.runtime.sendMessage({ popupMounted: true });
  }, []);

  return (
    <div className="popupContainer">
      Hello, world!
      <button className="btn btn-primary">bar</button>
    </div>
  );
}
