import React, { useEffect, useState } from "react";
import { Button, Form, Modal } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { } from '@fortawesome/free-solid-svg-icons'
import "./Popup.scss";
import { faCode, faHistory } from "@fortawesome/free-solid-svg-icons";

export default function Popup() {
  useEffect(() => {
    // Example of how to send a message to eventPage.ts.
    chrome.runtime.sendMessage({ popupMounted: true });
  }, []);

  return (
    <div className="mw-auto">
      <div className="popup-header d-flex text-light px-3 py-2">
        <div className="fw-bold">
          SlackDeck
        </div>
      </div>
      <div className="px-3 py-2 text-nowrap">
        <div className="d-flex">
          <div className="me-1">
            <FontAwesomeIcon icon={faHistory} />
          </div>
          <div>
            <a href="https://github.com/yamamoto-yuta/slack-deck/releases" target="_blank">
              Release Note
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
